const express = require('express');
const router = express.Router();

const validateDiet = require('../validation/diet');
const authenticate = require('../validation/passport');

const Diet = require('../models/Diet');

router.get('/', (req, res) => {
    const errors = {};
    const user = authenticate(req.headers['authorization']);
    if (!user) {
        errors.diet = 'Brak autoryzacji';
        return res.status(404).json(errors);
    }
    else {
        Diet.findOne({ user_id: user._id })
            .then(diet => {
                if (!diet) {
                    errors.diet = 'Brak diety';
                    res.status(404).json(errors);
                } else {
                    res.status(200).json(diet)
                }
            })
            .catch(err => res.status(404).json(err))
    }
})

router.post('/', (req, res) => {
    const errors = {};
    const user = authenticate(req.headers['authorization']);
    if (!user) {
        errors.diet = "Brak autoryzacji"
        return res.status(404).json(errors);
    }
    else {
        const { errors, isValid } = validateDiet(req.body);

        if (!isValid) return res.status(400).json(errors);

        const newDiet = new User({
            user_id: user._id,
            height: req.body.height,
            weight: req.body.weight,
            trainings: req.body.trainings,
            selectedAim: req.body.selectedAim,
            selectedAllergies: req.body.selectedAllergies,
            selectedIllnesses: req.body.selectedIllnesses,
            selectedAfflictions: req.body.selectedAfflictions,
            selectedMeatFrequency: req.body.selectedMeatFrequency,
            selectedFishFrequency: req.body.selectedFishFrequency,
            selectedNutsFrequency: req.body.selectedFishFrequency,
            selectedFishFrequency: req.body.selectedFishFrequency,
            selectedFruitFrequency: req.body.selectedFruitFrequency,
            selectedVegetableFrequency: req.body.selectedVegetableFrequency,
            selectedMeat: req.body.selectedMeat,
            selectedFish: req.body.selectedFish,
            selectedNuts: req.body.selectedNuts,
            selectedFruit: req.body.selectedFruit,
            selectedVegetable: req.body.selectedVegetable,
        });

        console.log(newDiet)
    }
})

module.exports = router;