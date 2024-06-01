const { body, validationResult } = require('express-validator');

const validateSignup = [
    // Define validation rules for signup endpoint
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 8, }).withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/).withMessage('Password must contain at least one uppercase letter, one lowercase letter and one symbol'),

    // Check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = { validateSignup };
