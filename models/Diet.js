const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DietSchema = new Schema({
  email: {
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
    type: [{ type: String }]
  },
  selectedIllnesses: {
    type: [{ type: String }]
  },
  selectedAfflictions: {
    type: [{ type: String }]
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
    type: [{ type: String }]
  },
  selectedFish: {
    type: [{ type: String }]
  },
  selectedNuts: {
    type: [{ type: String }]
  },
  selectedFruit: {
    type: [{ type: String }]
  },
  selectedVegetable: {
    type: [{ type: String }]
  },
})

module.exports = Diet = mongoose.model('Diet', DietSchema);