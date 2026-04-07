const express = require('express');
const router = express.Router();
const attedantController = require('../../controller/attendantController');
// import middleware
const verifyJWT = require('../../middleware/verifyJWT')
const validator = require('../../middleware/validator')
const createAttendantSchema = require('../../validators/attendantValidate')

router.use(verifyJWT)

router.route('/')
    .post( validator(createAttendantSchema), attedantController.createAttendant )
    .get(attedantController.getAllAttendants)

module.exports = router