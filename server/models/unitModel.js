const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  SI: {
    type: String
  },
  toSI: {
    type: Number
  }
});

const Unit = mongoose.model('unit', unitSchema);

module.exports = Unit;