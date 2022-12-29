var express = require('express');
const { authenticate } = require('../middleware/authentication')
var controller = require('../controllers/user')

var router = express.Router();


// ----- Delete User
router.delete('/deleteUser/:id', authenticate, controller.deleteUser)

// ----- Reset Password
router.post('/resetPassord/:id', authenticate, controller.resetPassword)

module.exports = router;
