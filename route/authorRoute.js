const express = require('express');
const router = express.Router();
const authorController = require('../controller/authorController');
// import middleware
const verifyJWT = require('../middleware/verifyJWT')
const validator = require('../middleware/validator')
const { createAuthorSchema, updateAuthorSchema, authorIdParamSchema } = require('../validators/authorValidate')

router.use(verifyJWT)

router.route('/')
    .post(verifyJWT, validator(createAuthorSchema), authorController.createAuthor)
    .get(verifyJWT, authorController.getAllAuthors)

router.route('/:id')
    .get(verifyJWT, validator(authorIdParamSchema, 'params'), authorController.getAuthorById)
    .put(verifyJWT, validator(authorIdParamSchema, 'params'), validator(updateAuthorSchema), authorController.updateAuthor)
    .delete(verifyJWT, validator(authorIdParamSchema, 'params'), authorController.deleteAuthor)

module.exports = router