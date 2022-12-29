var express = require('express');
var router = express.Router();
var conrtollerLogin = require("../controllers/login")
var conrtollerSignin = require("../controllers/signin")

// ----- Login
router.post('/login', conrtollerLogin.login)
// ----- Logout
router.post('/logout', conrtollerLogin.logout)
// ----- Sigin
router.post('/signin', conrtollerSignin.signin)

module.exports = router