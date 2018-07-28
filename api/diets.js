const express = require('express');
const router = express.Router();
const passport = require('passport');

const validateDiet = require('../validation/diet');
const authenticate = require('../validation/passport');

const Diet = require('../models/Diet');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    Diet.findOne({ user_id: req.user._id })
        .then(diet => {
            if (!diet) {
                errors.diet = 'Brak diety';
                res.status(404).json(errors);
            } else {
                res.status(200).json(diet)
            }
        })
        .catch(err => console.log(err))
})

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateDiet(req.body);

    if (!isValid) return res.status(400).json(errors);

    Diet.findOne({ user_id: req.user._id }).then(diet => {
        if (diet) {
            errors.diet = 'Dieta juz istnieje';
            console.log("ISNTIEJE")

            return res.status(400).json(errors);
        } else {

            const newDiet = new Diet({
                user_id: req.user._id,
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

            newDiet
                .save()
                .then(diet => res.status(200).json(diet))
                .catch(err => console.log(err));
        }
    })
})

module.exports = router;