var express = require('express');
const { authenticate } = require('../middleware/authentication')
var controller = require('../controllers/student')

var router = express.Router();


// ----- Studentes / Pagination
router.get('/all' ,authenticate, controller.allStudents)
// ----- Add
router.post('/createStudent', authenticate, controller.addStudent)
// ----- One Student
router.get('/oneStudent/:id', authenticate, controller.getOneStudent)
// ----- Update Student
router.put('/updateStudent/:id', authenticate, controller.updateStudent)
// ----- Delete Student
router.delete('/deleteStudent/:id', authenticate, controller.deleteStudent)

module.exports = router;
