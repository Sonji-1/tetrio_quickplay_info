const express = require('express');
const path = require('path');
const userInfoRouter = require('./routers/userInfo');
const fortyLinesRouter = require('./routers/fortyLines');
const blitzRouter = require('./routers/blitz');
const quickPlayRouter = require('./routers/quickPlay');
const tetraLeagueRouter = require('./routers/tetraLeague');
const zenRouter = require('./routers/zen');
const generalInfoRouter = require('./routers/generalInfo'); // 수정된 라우터

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.use((req, res, next) => {
  console.log('요청 받음:', req.method, req.url);
  next();
});

app.use('/api/user', userInfoRouter);
app.use('/api/general', generalInfoRouter); // 수정된 라우터
app.use('/api/40lines', fortyLinesRouter);
app.use('/api/blitz', blitzRouter);
app.use('/api/quickplay', quickPlayRouter);
app.use('/api/tetraleague', tetraLeagueRouter);
app.use('/api/zen', zenRouter);

// 404 에러 핸들러 추가
app.use((req, res, next) => {
  console.log('404 에러 발생:', req.url);
  res.status(404).json({ error: '요청한 리소스를 찾을 수 없습니다.' });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});