const express = require('express');
const router = express.Router();

const userlogin = require ("../controller/userLogin.js")

router.post('/',userlogin.post)


module.exports = router