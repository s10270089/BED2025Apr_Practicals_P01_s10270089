const Joi = require("joi");

const reminderSchema = Joi.object({
  title: Joi.string().min(1).max(50).required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title cannot be empty",
    "string.min": "Title must be at least 1 character",
    "string.max": "Title cannot exceed 50 characters",
    "any.required": "Title is required",
  }),
  date: Joi.date().required().messages({
    "date.base": "Date must be valid",
    "any.required": "Date is required",
  }),
});

function validateReminder(req, res, next) {
  const { error } = reminderSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage = error.details.map((d) => d.message).join(", ");
    return res.status(400).json({ error: errorMessage });
  }
  next();
}

module.exports = {
  validateReminder,
};
