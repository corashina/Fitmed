const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainingSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = User = mongoose.model('Training', TrainingSchema);