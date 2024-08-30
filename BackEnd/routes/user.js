const express = require('express');
const router = express.Router();
const userRegister= require ('../controller/userregister.js')

router.post('/',userRegister.post)
router.get('/:id',userRegister.get)

router.get('/',userRegister.getAllUsers)
router.delete('/:id',userRegister.delete)

module.exports = router