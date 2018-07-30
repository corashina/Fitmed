const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SupplementationSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  height: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  meals: {
    type: String,
    required: true
  },
  selectedAim: {
    type: String,
    required: true
  },
  selectedAllergies: {
    type: [{ type: String }]
  },
  selectedIllnesses: {
    type: [{ type: String }]
  },
  selectedAfflictions: {
    type: [{ type: String }]
  },
})

module.exports = Supplementation = mongoose.model('Supplementation', SupplementationSchema);