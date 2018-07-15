const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  protein: {
    type: Number,
    required: true
  },
  fat: {
    type: Number,
    required: true
  },
  carbon: {
    type: Number,
    required: true
  },
  ingredients: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Product',
    required: true
  },
  execution: {
    type: String,
    required: true
  },
  exclude: {
    type: String,
    required: true
  }
})

module.exports = User = mongoose.model('Recipe', RecipeSchema);