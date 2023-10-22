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
  //console.log(req.body)
})

// 라우터 등록
app.get('/api/data', (req: Request, res: Response) => {
  const query = 'SELECT * FROM tb_user';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('쿼리부분 에러', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    } else {
      res.json(results);
    }
  });
});

//회원가입시, 중복되는 닉네임 검사를 위한 닉네임 가져오기
app.get('/api/register', async (req: Request, res:Response) => {
  const nickName = req.query.nickName;
  const query = 'SELECT nickName FROM tb_user WHERE nickName = ?;'

  connection.query(query,[nickName], (err, results) => {
    if (err) {
      console.error('쿼리부분 에러', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    } else {
      res.json(results);
    }
  })
})

// 인증정보 유효성 검사 
app.post('/api/register', async (req: Request, res: Response) => {
  const query : string = `SELECT id, nickName, platform FROM tb_user WHERE id = '${req.body.id}'`
  connection.query(query, (err, results : mysql.OkPacket[]) => {
    if (err) {
      console.error('쿼리부분 에러', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    } else {
      //console.log(results.length);
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

app.get('/main', async(req: Request, res: Response)=> {
  const query = 'SELECT * FROM tb_posts ORDER BY date DESC'; 

  connection.query(query, (err, results) => {
    if (err) {
      console.error('쿼리부분 에러', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    } else {
      res.json(results);
    }
  });
});

app.get('/view/:num',async (req:Request, res:Response) => {
  const num = req.params.num;
  const selectQuerry = `SELECT * FROM tb_posts WHERE num = ${num}`

  connection.query(selectQuerry, (err, results) => {
    if (err) {
      console.error('쿼리부분 에러', err);
      res.status(500).json({ error: 'An error occurred while fetching data.' });
    } else {
      res.json(results);
    }
  });
})

app.delete('/delete/:num', (req:Request, res:Response)=>{
  const num = req.params.num;
  const deleteQuery = `DELETE FROM tb_posts WHERE num = ?`

  connection.query(deleteQuery, [num], (err, result : mysql.OkPacket ) => {
    if (err) {
      console.error('쿼리 부분 에러', err);
      res.status(500).json({ error: '데이터 삭제 중 오류가 발생했습니다.' });
    } else {
      if (result.affectedRows > 0) {
        res.status(204).send(); // 삭제 성공 시 204 No Content 응답 반환
      } else {
        res.status(404).json({ error: '해당 넘버를 가진 리소스를 찾을 수 없습니다.' });
      }
    }
  });
})

app.post('/write', async (req: Request, res: Response) => {
  const {nickName, title, content, gameName, genre, detailGenre, url, personnel, deadLine} = req.body;
  const insertQuery = `INSERT INTO tb_posts (writer, title, content, gameName, genre, detailGenre, url, personnel, deadLine) VALUES ('${nickName}', '${title}', '${content}', '${gameName}', '${genre}', '${detailGenre}', '${url}', '${personnel}', '${deadLine}')`
  connection.query(insertQuery, (err, insertResult)=>{
    if (err){
      res.status(500).json({error : '글 작성중 오류가 발생했습니다.'})
    } else {
      res.json({status : 'success'});
    }
  })
});

app.put('/modify/:num', (req:Request, res:Response)=>{
  const num = req.params.num;
  const { title, content, gameName, genre, detailGenre, url, personnel, deadLine} = req.body;
  
  const updateQuerry = `
  UPDATE tb_posts
    SET title = ?, content = ?, gameName = ?, genre = ?, detailGenre = ?, url = ?,personnel = ?, deadLine = ?
  WHERE 
  num = ?`;

  connection.query(updateQuerry, [ title, content, gameName, genre, detailGenre, url, personnel, deadLine, num], (error, result)=>{
    if (error) {
      res.status(500).json({ message: '데이터베이스 업데이트 오류' });
    } else {
      res.status(200).json({ message: '데이터 업데이트 완료' });
    }
  })
})
// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  
});



