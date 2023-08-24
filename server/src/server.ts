// server/index.js 또는 서버 애플리케이션 진입 파일
import mysql from 'mysql2';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // .env 파일의 환경 변수를 process.env에 등록

const app = express();
const port = process.env.SERVER_PORT; // .env 파일에서 등록한 환경 변수 사용


//mysql 커넥션 시킴
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// 미들웨어 등록
app.use(bodyParser.json());
app.use(cors());

//카카오 토큰
app.post('/api/token', (req : Request, res: Response) =>{
  console.log(req.body)
})

// 라우터 등록
app.get('/api/data', (req: Request, res: Response) => {
  const query = 'SELECT * FROM tb_user'; // 적절한 테이블 이름으로 변경해주세요.

  connection.query(query, (err, results) => {
    if (err) {
      console.error('쿼리부분 에러', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    } else {
      res.json(results);
    }
  });
});

// 인증정보 유효성 검사 
app.post('/api/register', async (req: Request, res: Response) => {
  const query : string = `SELECT id, nickName, platform FROM tb_user WHERE id = '${req.body.id}'`
  connection.query(query, (err, results : mysql.OkPacket[]) => {
    if (err) {
      console.error('쿼리부분 에러', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    } else {
      console.log(results.length);
      if(results.length > 0){
        res.json({ status: 'login', userInfo : results[0] }); // 클라이언트에게 에러 응답 보내기
      }else{
        const {id, nickName, platform} = req.body
        if(nickName === undefined){
          res.json({status : 'register'})
          return
        }else{
          const insertQuery = `INSERT INTO tb_user (id, nickName, platform) VALUES ('${id}','${nickName}', '${platform}')`
          connection.query(insertQuery, (err, insertResults) => {
            if (err) {
              //console.error('회원가입 쿼리 실행 중 에러', err);
              res.status(500).json({ error: 'An error occurred while registering user.' });
            } else {
              //console.log('회원가입 성공', insertResults);
              res.json({ status: 'registerSuccess'});
            }
          });
        }
      }
    }
  });
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



