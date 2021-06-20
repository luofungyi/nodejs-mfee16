const express = require('express');
const router = express.Router();

const { body, validationResult} = require("express-vaildtor");
const { validationResult } = require('express-validator');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

const registerRules = [
    body("email").isEmail().withMessage("請輸入正確格式"),
    body("password").isLength({ min:6 }),
    body("comfirmPassword").coustom((value,{req}) => {
        return value === req.body.password;
    }),
];

router.use
applicationCache.us

router.post('/register',registerRules, (req, res) => {
    //TODO
    // 中間函式(express.urlencoded)設定，
    console.log(req.body);

    const validationResult = validationResult(req);
    res.send('這是 POST Registe');
});

router.get('/login', (req, res) => {
    res.render('auth/rlogin');
});

module.exports = router;
