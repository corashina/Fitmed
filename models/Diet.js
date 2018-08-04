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
  time_01: {
    type: Number,
    default: 7
  },
  time_02: {
    type: Number,
    default: 11
  },
  time_03: {
    type: Number,
    default: 15
  },
  time_04: {
    type: Number,
    default: 19
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
  time_01_monday: {
    type: [{ type: String }]
  },
  time_01_tuesday: {
    type: [{ type: String }]
  },
  time_01_wednesday: {
    type: [{ type: String }]
  },
  time_01_thursday: {
    type: [{ type: String }]
  },
  time_01_friday: {
    type: [{ type: String }]
  },
  time_01_saturday: {
    type: [{ type: String }]
  },
  time_01_sunday: {
    type: [{ type: String }]
  },
  time_02_monday: {
    type: [{ type: String }]
  },
  time_02_tuesday: {
    type: [{ type: String }]
  },
  time_02_wednesday: {
    type: [{ type: String }]
  },
  time_02_thursday: {
    type: [{ type: String }]
  },
  time_02_friday: {
    type: [{ type: String }]
  },
  time_02_saturday: {
    type: [{ type: String }]
  },
  time_02_sunday: {
    type: [{ type: String }]
  },
  time_03_monday: {
    type: [{ type: String }]
  },
  time_03_tuesday: {
    type: [{ type: String }]
  },
  time_03_wednesday: {
    type: [{ type: String }]
  },
  time_03_thursday: {
    type: [{ type: String }]
  },
  time_03_friday: {
    type: [{ type: String }]
  },
  time_03_saturday: {
    type: [{ type: String }]
  },
  time_03_sunday: {
    type: [{ type: String }]
  },
  time_04_monday: {
    type: [{ type: String }]
  },
  time_04_tuesday: {
    type: [{ type: String }]
  },
  time_04_wednesday: {
    type: [{ type: String }]
  },
  time_04_thursday: {
    type: [{ type: String }]
  },
  time_04_friday: {
    type: [{ type: String }]
  },
  time_04_saturday: {
    type: [{ type: String }]
  },
  time_04_sunday: {
    type: [{ type: String }]
  },
  comments: {
    type: [],
    default: []
  }
})

module.exports = Diet = mongoose.model('Diet', DietSchema);