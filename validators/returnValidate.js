const Joi = require('joi')

const returnBookParamSchema = Joi.object({
    id: Joi.string().length(24).hex().required().messages({
        'string.empty': 'Book ID is required',
        'string.length': 'Book ID must be a valid MongoDB ObjectId',
        'string.hex': 'Book ID must be a valid hex string'
    })
})

module.exports = returnBookParamSchema