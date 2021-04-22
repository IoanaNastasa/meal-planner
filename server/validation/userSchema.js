const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'This field is required.',
    'string.base': 'Email should be a string.',
    'string.email': 'Please insert a valid email.',
  }),
  password: Joi.string().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).required().messages({
    'string.empty': 'This field is required.',
    'string.base': 'Password should be a string.',
    'string.pattern.base': 'Password should contain at least one capital letter, one lowercase letter, one number, one special character, and be 8 or more characters length.',
  }),
  passwordVerify: Joi.string()
  .required()
  .valid(Joi.ref('password'))
  .messages({
      'any.only': 'Passwords do not match.'
  })
});


const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'This field is required.',
    'string.base': 'Email should be a string.',
    'string.email': 'Please insert a valid email.',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'This field is required.',
    'string.base': 'Password should be a string.'
  })
});

module.exports = {
  registerSchema,
  loginSchema
};