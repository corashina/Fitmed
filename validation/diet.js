const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.height = !isEmpty(data.height) ? data.height : '';
  data.weight = !isEmpty(data.weight) ? data.weight : '';
  data.trainings = !isEmpty(data.trainings) ? data.trainings : '';
  data.selectedAim = !isEmpty(data.selectedAim) ? data.selectedAim : '';
  data.selectedAllergies = !isEmpty(data.selectedAllergies) ? data.selectedAllergies : '';
  data.selectedIllnesses = !isEmpty(data.selectedIllnesses) ? data.selectedIllnesses : '';
  data.selectedAfflictions = !isEmpty(data.selectedAfflictions) ? data.selectedAfflictions : '';
  data.selectedMeatFrequency = !isEmpty(data.selectedMeatFrequency) ? data.selectedMeatFrequency : '';
  data.selectedFishFrequency = !isEmpty(data.selectedFishFrequency) ? data.selectedFishFrequency : '';
  data.selectedNutsFrequency = !isEmpty(data.selectedNutsFrequency) ? data.selectedNutsFrequency : '';
  data.selectedFruitFrequency = !isEmpty(data.selectedFruitFrequency) ? data.selectedFruitFrequency : '';
  data.selectedVegetableFrequency = !isEmpty(data.selectedVegetableFrequency) ? data.selectedVegetableFrequency : '';
  data.selectedMeat = !isEmpty(data.selectedMeat) ? data.selectedMeat : '';
  data.selectedFish = !isEmpty(data.selectedFish) ? data.selectedFish : '';
  data.selectedNuts = !isEmpty(data.selectedNuts) ? data.selectedNuts : '';
  data.selectedFruit = !isEmpty(data.selectedFruit) ? data.selectedFruit : '';
  data.selectedVegetable = !isEmpty(data.selectedVegetable) ? data.selectedVegetable : '';

  if (Validator.isEmpty(data.height)) errors.height = 'Wzrost nie może być pusty';

  if (Validator.isEmpty(data.weight)) errors.weight = 'Waga nie może być pusta';

  if (Validator.isEmpty(data.trainings)) errors.trainings = 'Trening nie może być pusty';

  if (Validator.isEmpty(data.selectedMeatFrequency)) errors.selectedMeatFrequency = 'Mieso nie może być puste';

  if (Validator.isEmpty(data.selectedFishFrequency)) errors.selectedFishFrequency = 'Ryby nie może być pusta';

  if (Validator.isEmpty(data.selectedNutsFrequency)) errors.selectedNutsFrequency = 'Orzechy nie może być pusta';

  if (Validator.isEmpty(data.selectedFruitFrequency)) errors.selectedFruitFrequency = 'Owoce nie może być pusta';

  if (Validator.isEmpty(data.selectedVegetableFrequency)) errors.selectedVegetableFrequency = 'Warzywa nie może być pusta';

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
