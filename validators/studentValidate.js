const Joi = require('joi')

const createStudentSchema = Joi.object({
    name: Joi.string().trim().min(2).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 2 characters'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be a valid email'
    }),
    studentId: Joi.string().trim().min(3).required().messages({
        'string.empty': 'Student ID is required',
        'string.min': 'Student ID must be at least 3 characters'
    })
});

// const updateStudentSchema = Joi.object({
//     name: Joi.string().trim().min(2).optional(),
//     email: Joi.string().email().optional(),
//     studentId: Joi.string().trim().min(3).optional()
//     }).min(1).messages({
//     'object.min': 'At least one field (name, email, or studentId) must be provided'
// });

const studentIdParamSchema = Joi.object({
    id: Joi.string().length(24).hex().required().messages({
        'string.length': 'Invalid student ID',
        'string.hex': 'Student ID must be a valid ObjectId'
    })
});

module.exports = { createStudentSchema, studentIdParamSchema }
