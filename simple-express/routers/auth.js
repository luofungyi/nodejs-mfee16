const express = require('express');
const router = express.Router();

router.get("/register", (req, res) =>{
    res.render("auth/register");
});

router.post("/register", (req, res) =>{
    //TODO
    res.send("這是 POST Registe");
});

router.get("/login", (req, res) =>{
    res.render("auth/rlogin");
});

module.exports = router;