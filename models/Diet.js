const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DietSchema = new Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = User = mongoose.model('Diet', DietSchema);