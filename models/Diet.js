const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DietSchema = new Schema({
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
  trainings: {
    type: String,
    required: true
  },
  selectedAim: {
    type: String,
    required: true
  },
  selectedAllergies: {
    type: String,
    required: true
  },
  selectedIllnesses: {
    type: String,
    required: true
  },
  selectedAfflictions: {
    type: String,
    required: true
  },
  selectedMeatFrequency: {
    type: String,
    required: true
  },
  selectedFishFrequency: {
    type: String,
    required: true
  },
  selectedNutsFrequency: {
    type: String,
    required: true
  },
  selectedFishFrequency: {
    type: String,
    required: true
  },
  selectedFruitFrequency: {
    type: String,
    required: true
  },
  selectedVegetableFrequency: {
    type: String,
    required: true
  },
  selectedMeat: {
    type: String,
    required: true
  },
  selectedFish: {
    type: String,
    required: true
  },
  selectedNuts: {
    type: String,
    required: true
  },
  selectedFruit: {
    type: String,
    required: true
  },
  selectedVegetable: {
    type: String,
    required: true
  },
})

module.exports = User = mongoose.model('Diet', DietSchema);