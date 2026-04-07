const Joi = require('joi');

const createAttendantSchema = Joi.object({
    name: Joi.string().trim().min(3).required().messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 3 characters'
    }),
    staffId: Joi.string().trim().min(3).required().messages({
        'string.empty': 'Staff ID is required',
        'string.min': 'Staff ID must be at least 3 characters'
    })
});

const updateAttendantSchema = Joi.object({
    name: Joi.string().trim().min(3).optional(),
    staffId: Joi.string().trim().min(3).optional()
    }).min(1).messages({
    'object.min': 'At least one field (name or staffId) must be provided'
});

const attendantIdParamSchema = Joi.object({
    id: Joi.string().length(24).hex().required().messages({
        'string.empty': 'Attendant ID cannot be eempty',
        'string.length': 'Invalid attendant ID',
        'string.hex': 'Attendant ID must be a valid ObjectId'
    })
});

module.exports = createAttendantSchema