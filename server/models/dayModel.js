const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    enum: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
    required: true
  },
  meals: {
    breakfast: {
      recipe: {type: mongoose.Schema.Types.ObjectId, ref: 'recipe'},
      ingredientsNeededIds: Array
    },
    lunch: {
      recipe: {type: mongoose.Schema.Types.ObjectId, ref: 'recipe'},
      ingredientsNeededIds: Array
    },
    dinner: {
      recipe: {type: mongoose.Schema.Types.ObjectId, ref: 'recipe'},
      ingredientsNeededIds: Array
    },
    snack: {
      recipe: {type: mongoose.Schema.Types.ObjectId, ref: 'recipe'},
      ingredientsNeededIds: Array
    }
  }
});

const Day = mongoose.model('day', daySchema);
module.exports = Day;