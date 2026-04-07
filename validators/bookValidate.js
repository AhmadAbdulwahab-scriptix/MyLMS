const Joi = require('joi');
const isbn = require('isbn-utils');

// Custom ISBN validator for Joi
const validateAndNormalizeISBN = (value, helpers) => {
    if (typeof value !== 'string')  return helpers.error('any.invalid', { message: 'ISBN must be a string' });
    const cleaned = value.replace(/[-\s]/g, '');

    // Parse ISBN
    const parsed = isbn.parse(cleaned);
    if (!parsed) return helpers.error('any.invalid', { message: 'Invalid ISBN' });

    // Prefer ISBN-13, fallback to ISBN-10
    const normalized = parsed.asIsbn13() || parsed.asIsbn10();

    if (!normalized) return helpers.error('any.invalid', { message: 'Could not normalize ISBN' });

    // Return the normalized string (important: Mongoose expects string)
    return normalized;
};

const authorSchema = Joi.object({
    _id: Joi.string().length(24).hex().optional(),
    name: Joi.string().trim().min(2).when('_id', {
        is: Joi.exist(),
        then: Joi.optional(),
        otherwise: Joi.required()
    }),
    authorId: Joi.string().trim().when('_id', {
        is: Joi.exist(),
        then: Joi.optional(),
        otherwise: Joi.required()
    }),
    bio: Joi.string().trim().allow('').when('_id', {
        is: Joi.exist(),
        then: Joi.optional(),
        otherwise: Joi.required()
    })
});

const createBookSchema = Joi.object({
    title: Joi.string().trim().min(2).required().messages({
        'string.empty': 'Title is required'
    }),
    isbn: Joi.string().required()
        .custom(validateAndNormalizeISBN).messages({
            'any.invalid': 'Invalid ISBN',
            'string.empty': 'ISBN is required'
        }),
    authors: Joi.array().items(authorSchema).min(1).required().messages({
        'array.min': 'At least one author is required'
    })
});

const updateBookSchema = Joi.object({
    title: Joi.string().trim().min(2).optional().messages({
        'string.min': 'Title must be at least 2 characters'
    }),
    isbn: Joi.string()
        .custom(validateAndNormalizeISBN)
        .messages({
            'any.invalid': 'Invalid ISBN'
        }),
    authors: Joi.array().items(authorSchema).optional()
    }).min(1).messages({
    'object.min': 'At least one field (title, isbn, or authors) must be provided'
});

const bookIdParamSchema = Joi.object({
    id: Joi.string().length(24).hex().required().messages({
        'string.length': 'Invalid book ID',
        'string.hex': 'Book ID must be a valid ObjectId'
    })
});

module.exports = { createBookSchema, updateBookSchema, bookIdParamSchema }