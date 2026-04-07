const Joi = require('joi');

const borrowBookSchema = Joi.object({
    attendantId: Joi.string().length(24).hex().required().messages({
        'string.empty': 'attendantId is required',
        'string.length': 'attendantId must be a valid MongoDB ObjectId',
        'string.hex': 'attendantId must be a valid hex string'
    }),
    studentId: Joi.string().length(24).hex().required().messages({
        'string.empty': 'studentId is required',
        'string.length': 'studentId must be a valid MongoDB ObjectId',
        'string.hex': 'studentId must be a valid hex string'
    }),
    returnDate: Joi.date().required().messages({
        'date.base': 'returnDate must be a valid date',
        'any.required': 'returnDate is required'
    })
});

const bookIdParamSchema = Joi.object({
    id: Joi.string().length(24).hex().required().messages({
        'string.empty': 'Book ID is required',
        'string.length': 'Book ID must be a valid MongoDB ObjectId',
        'string.hex': 'Book ID must be a valid hex string'
    })
});

module.exports = { borrowBookSchema, bookIdParamSchema }