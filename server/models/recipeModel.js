const mongoose = require('mongoose');
const User = require('./userModel');

const recipeModel = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: { type: String, required: true},
  ingredients: [{
    ingredientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ingredient'
    },
    name: String,
    quantity: Number,
    unitID: String
  }]
});

const Recipe = mongoose.model('recipe', recipeModel);

module.exports = Recipe;