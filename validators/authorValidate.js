const Joi = require('joi')

const createAuthorSchema = Joi.object({
    authorId: Joi.string().trim().min(3).required().messages({
        "string.empty": "Author ID is required"
    }),

    name: Joi.string().trim().min(3).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be more than 2 characters"
    }),

    bio: Joi.string().trim().optional().allow('')
});

const updateAuthorSchema = Joi.object({
    name: Joi.string().trim().min(3).optional(),

    bio: Joi.string().trim().optional().allow('')
    })
    .min(1)
    .messages({
    "object.min": "At least one field (name or bio) must be provided"
});

const authorIdParamSchema = Joi.object({
    id: Joi.string().length(24).hex().required().messages({
        "string.length": "Invalid author ID",
        "string.hex": "ID must be a valid ObjectId"
    })    
});

module.exports = { createAuthorSchema, updateAuthorSchema, authorIdParamSchema }