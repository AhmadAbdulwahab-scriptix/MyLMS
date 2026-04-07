const express = require('express');
const router = express.Router();
const studentController = require('../../controller/studentController')
// import middleware
const verifyJWT = require('../../middleware/verifyJWT')
const validator = require('../../middleware/validator')
const { createStudentSchema, studentIdParamSchema } = require('../../validators/studentValidate')

router.use(verifyJWT)

router.route('/')
    .post(validator(createStudentSchema), studentController.createStudent)
    .get(studentController.getAllStudents)

router.route('/:id')
    .get(validator(studentIdParamSchema, 'params'), studentController.getStudentById)

module.exports = router