// middlewares/validateBody.js
const Joi = require("joi");

// 🔥 Full Joi Schema with all data types
const schema = Joi.object({
  name: Joi.string().min(1).max(100).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 1 character long",
    "string.max": "Name cannot exceed 100 characters",
    "any.required": "Name is required",
  }),

  age: Joi.number().integer().min(0).max(120).required().messages({
    "number.base": "Age must be a number",
    "number.integer": "Age must be an integer",
    "number.min": "Age cannot be negative",
    "number.max": "Age cannot exceed 120",
    "any.required": "Age is required",
  }),

  isActive: Joi.boolean().required().messages({
    "boolean.base": "isActive must be true or false",
    "any.required": "isActive is required",
  }),

  birthDate: Joi.date().iso().required().messages({
    "date.base": "Birth Date must be a valid date",
    "date.format": "Birth Date must be in ISO format (YYYY-MM-DD)",
    "any.required": "Birth Date is required",
  }),

  reminderTime: Joi.string().pattern(/^\d{2}:\d{2}:\d{2}$/).required().messages({
    "string.pattern.base": "Reminder time must be in HH:mm:ss format",
    "any.required": "Reminder time is required",
  }),

  status: Joi.string().valid("Pending", "In Progress", "Done").required().messages({
    "any.only": "Status must be one of: Pending, In Progress, Done",
    "any.required": "Status is required",
  }),

  tags: Joi.array().items(Joi.string().min(1)).max(10).messages({
    "array.base": "Tags must be an array",
    "array.max": "You can have up to 10 tags only",
    "string.min": "Each tag must be at least 1 character long",
  }),

  address: Joi.object({
    street: Joi.string().required().messages({
      "string.base": "Street must be a string",
      "any.required": "Street is required",
    }),
    postalCode: Joi.string().pattern(/^\d{6}$/).required().messages({
      "string.pattern.base": "Postal code must be 6 digits",
      "any.required": "Postal code is required",
    }),
  }).required().messages({
    "object.base": "Address must be an object",
    "any.required": "Address is required",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
    "any.required": "Email is required",
  }),

  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d).{8,}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters, with uppercase, lowercase, and a number",
      "any.required": "Password is required",
    }),
});

// 🧠 Middleware function
function validateBody(req, res, next) {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join(", ");
    return res.status(400).json({ error: errorMessage });
  }

  next(); // Everything valid — continue
}

module.exports = validateBody;
