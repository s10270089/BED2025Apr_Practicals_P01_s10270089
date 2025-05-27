const { body, validationResult } = require('express-validator');

exports.validateStudent = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('age').isInt({ min: 1 }).withMessage('Age must be a positive integer'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
