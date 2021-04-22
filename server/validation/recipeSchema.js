const Joi = require('joi');

const createRecipeSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'This field is required.',
    'string.base': 'The recipe name should be a string.'
  }),
  ingredients: 
    Joi.array().items(Joi.object({
      ingredientID: Joi.string().optional().default(null).messages({
        'string.base': 'The ingredientID should be a string.'
      }),
      name: Joi.string().when('ingredientID', { is: null, then: Joi.required() }).messages({
        'any.required': 'The ingredient is required.',
        'string.base': 'The ingredient name should be a string.'
      }),
      quantity: Joi.number().positive().required().messages({
        'number.empty': 'The quantity is required',
        'number.base': 'The quantity should be a number.',
        'number.positive': 'The quantity should be a positive number.'
      }),
      unitID: Joi.string().optional().messages({
        'number.unitID': 'The unit should be a number.',
      }),
    }))
});

const editRecipeSchema = Joi.object({
  ingredients: Joi.array().items(Joi.object({
      ingredientID: Joi.string().optional().default(null).messages({
        'string.base': 'The ingredientID should be a string.'
      }),
      name: Joi.string().when('ingredientID', { is: null, then: Joi.required() }).messages({
        'any.required': 'The ingredient is required.',
        'string.base': 'The ingredient name should be a string.'
      }),
      quantity: Joi.number().positive().required().messages({
        'number.empty': 'The quantity is required',
        'number.base': 'The quantity should be a number.',
        'number.positive': 'The quantity should be a positive number.'
      }),
      unitID: Joi.string().optional().messages({
        'number.unitID': 'The unit should be a number.',
      }),
  }))
});

module.exports = { createRecipeSchema, editRecipeSchema };