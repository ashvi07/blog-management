// blogPostValidationMiddleware.js
const { body, validationResult } = require('express-validator');
const { param } = require('../routes/imageRoutes');

const validateBlogPost = [
    // Define validation rules for blog post endpoint
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('author').notEmpty().withMessage('Author is required'),

    // Check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];

const validateBlogCommentPost = [
    // Define validation rules for blog post endpoint
    body('author').notEmpty().withMessage('Author is required'),
    body('content').notEmpty().withMessage('Content is required'),
    body('createdAt').notEmpty().withMessage('Created date is required'),

    // Check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateBlogPost, validateBlogCommentPost };
