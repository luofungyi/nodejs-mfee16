const express = require('express');
const router = express.Router();
const connection = require('../utils/db');
const bcrypt = require('bcrypt');
const path = require('path');
const multer = require('multer');
const { body, validationResult } = require('express-validator');

// 檔案放在
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cd(null, path.join(__dirname, '../', 'public', 'uploads'));
    },
    filename: function (req, file, cb) {
        // 拿到附檔名
        const ext = file.originalname.split('.').pop();
        // 自己想要的檔案名
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});
// multer 上傳工具
const uploader = multer({
    storage: storage,
    filefilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('是不合格的副檔名'));
        }
        // 檔案ＯＫ, 接受這個檔案
        cb(null, true);
    },
    limits: {
        // 檔案的上限 1M
        fileSize: 1024 * 1024,
    },
});

// --

// --
router.get('/register', (req, res, next) => {
    res.render('auth/register');
});

const registerRules = [
    body('email').isEmail().withMessage('請輸入正確格式'),
    body('password').isLength({ min: 6 }),
    body('confirmPassword').custom((value, { req }) => {
        return value === req.body.password;
    }),
];

router.post('/register', registerRules, async (req, res, next) => {
    //TODO
    // 中間函式(express.urlencoded)設定，
    console.log(req.body);

    // 驗證
    const validationResult = validationResult(req);
    if (!validationResult.isEmpty()) {
        return next(new Error('註冊資料有問題'));
    }

    let checkResult = await connection.queryAsync(
        'SELECT * FROM　members WHERE email = ? ',
        req.body.email
    );

    if (checkResult.length > 0) {
        return next(new Error('已經註冊'));
    }
    let filepath = req.file ? '/uploads/' + req.file.filename : null;

    let result = await connection.queryAsync(
        'INSTERT INTO members (email, passord, name)VALUES (?)',
        [
            [
                req.body.email,
                await bcrypt.hash(req.body.password, 10),
                req.body.name,
            ],
        ]
    );

    res.send('註冊成功');
});

router.get('/login', (req, res) => {
    res.render('auth/rlogin');
});

const loginRules = [
    body('email').isEmail().withMessage('請輸入正確格式'),
    body('password').isLength({ min: 6 }),
];

router.post('/login', loginRules, async (req, res) => {
    console.log(req.body);

    const validationResult = validationResult(req);
    if (!validationResult.isEmpty()) {
        return next(new Error('登入資料有問題'));
    }

    // 檢查 email
    let checkResult = await connection.queryAsync(
        'SELECT * FROM　members WHERE email = ? ',
        req.body.email
    );

    if (checkResult.length === 0) {
        return next(new Error('查無帳號'));
    }

    member = member[0];

    // 比對密碼

    let result = await bcrypt.compare(req.body.password, member.password);
    if (result) {
        req.session.member = {
            email: member.email,
            name: member.name,
            photo: member.photo,
        };
        res.redirect(303, '/login');
        // res.send('登入成功');
    } else {
        req.session.isLogin = true;
        res.send('登入失敗');
    }

    res.send('登入結果 ?');
});

module.exports = router;
