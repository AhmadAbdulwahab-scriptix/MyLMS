const express = require('express');
const router = express.Router();
const bookController = require('../controller/bookController');
// import middleware
const verifyJWT = require('../middleware/verifyJWT')
const validator = require('../middleware/validator')
const { createBookSchema, updateBookSchema, bookIdParamSchema } = require('../validators/bookValidate')

router.use(verifyJWT)

router.route('/')
    .post( validator(createBookSchema), bookController.createBook )
    .get(bookController.getAllBooks)

router.route('/:id')
    .get( validator(bookIdParamSchema, 'params'), bookController.getBookById )
    .put( validator(bookIdParamSchema, 'params'), validator(updateBookSchema), bookController.updateBook )
    .delete( validator(bookIdParamSchema, 'params'), bookController.deleteBook )

// router.route('/search')
//     .get(bookController.searchBook)


module.exports = router