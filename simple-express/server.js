const connection = require('./utils/db');
const express = require('express');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
let app = express();

// 拿到 post 資料， 若 npm i boby-parser
app.use(express.urlencoded({ extended: false }));
// 前端送 json
app.use(express.json());
// 拿到 cookie
app.use(cookieParser());
// 拿到 session
app.use(
    expressSession({
        secrect: process.env.SESSION_SECRET,
        saveUninitialized: false,
    })
);

app.use(express.static('public'));

app.set('views', 'views');
app.set('view engine', 'pug');

app.use(function (req, res, next) {
    // req.session 設定給 res.locals < 透過這個方式把資料給views
    res.locals.member = req.session.member;
    next();
});

app.use(function (req, res, next) {
    console.log('Middleware');
    next();
});

app.use(function (req, res, next) {
    let current = new Date();
    console.log(`訪問${current}`);
    next();
});

let stockRouter = require('./routers/stock');
app.use('/stock', stockRouter);
let apiRouter = require('./routers/api');
app.use('/api', apiRouter);
let authRouter = require('./routers/auth');
app.use('/auth', authRouter);
// /auth 網址自定義

app.get('/', function (req, res) {
    console.log('這是首頁');

    res.cookie('lang', 'zh-TW');

    res.render('index');
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/test', function (req, res) {
    res.send('Test Express');
});

app.use(function (req, res, next) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.log(err.message);
    res.status(500);
    res.send('500');
});

app.listen(3000, async () => {
    await connection.connectAsync();
    console.log(`跑起來了 3000 Port`);
});
