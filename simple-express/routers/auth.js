const router = express.Router();
const express = require('express');
const connection = require('../utils/db');
const bcrypt = require('bcrypt');
const path = require('path');
const multer = require('multer');
const { body, validationResult } = require('express-validator');


// 檔案放在
const storage = multer.diskStorage({
    destination: function (req, res, cd) {
        cd(null, path.join(__dirname, '../', 'public', 'uploads'));
    },
});

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

    res.send('這是 POST Registe');
});

router.get('/login', (req, res) => {
    res.render('auth/rlogin');
});

module.exports = router;
