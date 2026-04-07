const express = require('express');
const router = express.Router();
const { handleStudentLogin, handleAttendantLogin } = require('../controller/authController');

// import middlewares
const validator = require('../middleware/validator');
const { studentLoginSchema, attendantLoginSchema } = require('../validators/authValidate');

router.route('/students/login')
    .post( validator(studentLoginSchema), handleStudentLogin )

router.route('/attendants/login')
    .post( validator(attendantLoginSchema), handleAttendantLogin )

module.exports = router