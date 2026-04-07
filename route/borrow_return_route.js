const express = require('express');
const router = express.Router();
const borrowBook = require('../controller/borrowController')
const returnBook = require('../controller/returnController')
// import middleware
const verifyJWT = require('../middleware/verifyJWT')
const validator = require('../middleware/validator')
const { borrowBookSchema, bookIdParamSchema } = require('../validators/borrowValidate')
const returnBookParamSchema = require('../validators/returnValidate')

router.use(verifyJWT)

router.route('/:id/borrow')
    .post( validator(bookIdParamSchema, 'params'), validator(borrowBookSchema), borrowBook)
    
router.route('/:id/return')
    .post( validator(returnBookParamSchema, 'params'), returnBook)

module.exports = router;
