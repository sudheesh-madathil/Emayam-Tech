const express = require('express');
const router = express.Router();

const userTask = require ("../controller/Taskmanage.js")

router.post('/',userTask.post)
router.get('/',userTask.get)
router.delete('/:id',userTask.delete)
router.put('/:id',userTask.put)


module.exports = router