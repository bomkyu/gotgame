"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// server/index.js 또는 서버 애플리케이션 진입 파일
const cron = __importStar(require("node-cron"));
const mysql2_1 = __importDefault(require("mysql2"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // .env 파일의 환경 변수를 process.env에 등록
const app = (0, express_1.default)();
const port = process.env.SERVER_PORT; // .env 파일에서 등록한 환경 변수 사용
//mysql 커넥션 시킴
const connection = mysql2_1.default.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
});
// 미들웨어 등록
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
//카카오 토큰
app.post('/api/token', (req, res) => {
    //console.log(req.body)
});
// 라우터 등록
app.get('/api/data', (req, res) => {
    const query = 'SELECT * FROM tb_user';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('쿼리부분 에러', err);
            res.status(500).json({ error: 'An error occurred while fetching data.' });
        }
        else {
            res.json(results);
        }
    });
});
//매일 자정에 실행되는 스케줄링 작업
cron.schedule('0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
    //현재날짜
    const currentDate = new Date();
    const updateQuery = `
    UPDATE tb_posts
    SET status = 1
    WHERE STR_TO_DATE(deadLine, '%Y-%m-%d') < ?
  `;
    connection.query(updateQuery, [currentDate], (err, results) => {
        if (err) {
            console.error('Error updating status:', err);
        }
        else {
            console.log('Status updated successfully');
        }
    });
}));
//회원가입시, 중복되는 닉네임 검사를 위한 닉네임 가져오기
app.get('/api/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nickName = req.query.nickName;
    const query = 'SELECT nickName FROM tb_user WHERE nickName = ?;';
    connection.query(query, [nickName], (err, results) => {
        if (err) {
            console.error('쿼리부분 에러', err);
            res.status(500).json({ error: 'An error occurred while fetching data.' });
        }
        else {
            res.json(results);
        }
    });
}));
// 인증정보 유효성 검사 
app.post('/api/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = `SELECT id, nickName, platform FROM tb_user WHERE id = '${req.body.id}'`;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('쿼리부분 에러', err);
            res.status(500).json({ error: 'An error occurred while fetching data.' });
        }
        else {
            //console.log(results.length);
            if (results.length > 0) {
                res.json({ status: 'login', userInfo: results[0] }); // 클라이언트에게 에러 응답 보내기
            }
            else {
                const { id, nickName, platform } = req.body;
                if (nickName === undefined) {
                    res.json({ status: 'register' });
                    return;
                }
                else {
                    const insertQuery = `INSERT INTO tb_user (id, nickName, platform) VALUES ('${id}','${nickName}', '${platform}')`;
                    connection.query(insertQuery, (err, insertResults) => {
                        if (err) {
                            //console.error('회원가입 쿼리 실행 중 에러', err);
                            res.status(500).json({ error: 'An error occurred while registering user.' });
                        }
                        else {
                            //console.log('회원가입 성공', insertResults);
                            res.json({ status: 'registerSuccess' });
                        }
                    });
                }
            }
        }
    });
}));
app.get('/main', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = 'SELECT * FROM tb_posts ORDER BY date DESC';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('쿼리부분 에러', err);
            res.status(500).json({ error: 'An error occurred while fetching data.' });
        }
        else {
            res.json(results);
        }
    });
}));
app.get('/view/:num', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const num = req.params.num;
    const selectQuerry = `SELECT * FROM tb_posts WHERE num = ${num}`;
    connection.query(selectQuerry, (err, results) => {
        if (err) {
            console.error('쿼리부분 에러', err);
            res.status(500).json({ error: 'An error occurred while fetching data.' });
        }
        else {
            res.json(results);
        }
    });
}));
app.delete('/delete/:num', (req, res) => {
    const num = req.params.num;
    const deleteQuery = `DELETE FROM tb_posts WHERE num = ?`;
    connection.query(deleteQuery, [num], (err, result) => {
        if (err) {
            console.error('쿼리 부분 에러', err);
            res.status(500).json({ error: '데이터 삭제 중 오류가 발생했습니다.' });
        }
        else {
            if (result.affectedRows > 0) {
                res.status(204).send(); // 삭제 성공 시 204 No Content 응답 반환
            }
            else {
                res.status(404).json({ error: '해당 넘버를 가진 리소스를 찾을 수 없습니다.' });
            }
        }
    });
});
app.post('/write', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickName, title, content, gameName, genre, detailGenre, url, personnel, deadLine } = req.body;
    const insertQuery = `INSERT INTO tb_posts (writer, title, content, gameName, genre, detailGenre, url, personnel, deadLine) VALUES ('${nickName}', '${title}', '${content}', '${gameName}', '${genre}', '${detailGenre}', '${url}', '${personnel}', '${deadLine}')`;
    connection.query(insertQuery, (err, insertResult) => {
        if (err) {
            res.status(500).json({ error: '글 작성중 오류가 발생했습니다.' });
        }
        else {
            res.json({ status: 'success' });
        }
    });
}));
app.put('/modify/:num', (req, res) => {
    const num = req.params.num;
    const { title, content, gameName, genre, detailGenre, url, personnel, deadLine } = req.body;
    const updateQuerry = `
  UPDATE tb_posts
    SET title = ?, content = ?, gameName = ?, genre = ?, detailGenre = ?, url = ?,personnel = ?, deadLine = ?
  WHERE 
  num = ?`;
    connection.query(updateQuerry, [title, content, gameName, genre, detailGenre, url, personnel, deadLine, num], (error, result) => {
        if (error) {
            res.status(500).json({ message: '데이터베이스 업데이트 오류' });
        }
        else {
            res.status(200).json({ message: '데이터 업데이트 완료' });
        }
    });
});
// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
