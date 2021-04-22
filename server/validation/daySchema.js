const Joi = require('joi');
const mealSchema = Joi.object({
  recipe: Joi.string().optional().messages({
    'string.base': 'The recipe name should be a string.'
  }),
  ingredientsNeededIds: Joi.array().items(Joi.string()).optional().messages({
    'array.base': 'The field should be an array.'
  })
});

const mealSchemaRequired = Joi.object({
  recipe: Joi.string().required().messages({
    'any.required': 'This field is required.',
    'string.base': 'The recipe name should be a string.'
  }),
  ingredientsNeededIds: Joi.array().items(Joi.string()).messages({
    'array.base': 'The field should be an array.'
  })
});

const createEditDaySchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'This field is required.',
    'string.base': 'The recipe name should be a string.'
  }),
  meals: Joi.object({
    breakfast: mealSchema,
    lunch: mealSchema,
    dinner: mealSchema,
    snack: mealSchema,
  }).required().messages({
    'any.required': 'This field is required.',
    'object.base': 'This field should be an object.',
  })
});

module.exports = {
  mealSchemaRequired,
  createEditDaySchema
};