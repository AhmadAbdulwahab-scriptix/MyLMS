const Joi = require('joi');

const studentLoginSchema = Joi.object({
    email: Joi.string().trim().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email must be valid'
    }),
    studentId: Joi.string().trim().min(3).max(20).required().messages({
        'string.empty': 'Student ID is required',
        'string.min': 'Student ID must be at least 3 characters',
        'string.max': 'Student ID cannot exceed 20 characters'
    })
});

const attendantLoginSchema = Joi.object({
    name: Joi.string().trim().min(3).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters'
    }),
    staffId: Joi.string().trim().min(3).max(20).required().messages({
        'string.empty': 'Staff ID is required',
        'string.min': 'Staff ID must be at least 3 characters',
        'string.max': 'Staff ID cannot exceed 20 characters'
    })
});

module.exports = { studentLoginSchema, attendantLoginSchema }