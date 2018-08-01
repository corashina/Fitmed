const express = require('express');
const router = express.Router();
const passport = require('passport');

const validateDiet = require('../validation/diet');

const Diet = require('../models/Diet');

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        Diet.findById({ _id: req.params.id })
            .then(diet => {
                if (!diet) {
                    errors.diet = 'Brak diety';
                    res.status(404).json(errors);
                } else {
                    res.status(200).json(diet)
                }
            })
            .catch(err => console.log(err))
    } else {
        errors.diet = 'Brak diety';
        res.status(404).json(errors);
    }

})

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    if (req.query.all) {
        Diet.find().then(diets => {
            if (!diets) {
                errors.diet = 'Brak diet';
                res.status(404).json(errors);
            } else {
                res.status(200).json(diets);
            }
        })
    } else {
        Diet.findOne({ email: req.user.email })
            .then(diet => {
                if (!diet) {
                    errors.diet = 'Brak diety';
                    res.status(404).json(errors);
                } else {
                    res.status(200).json(diet)
                }
            })
            .catch(err => console.log(err))
    }
})


router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateDiet(req.body);

    if (!isValid) return res.status(400).json(errors);

    Diet.findOne({ email: req.user.email }).then(diet => {
        if (diet) {
            errors.diet = 'Dieta juz istnieje';

            return res.status(400).json(errors);
        } else {

            const newDiet = new Diet({
                email: req.user.email,
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


router.post('/:id/addRecipe', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    const id = req.params.id;
    const data = req.body.data;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        Diet.update({ _id: req.params.id }, { $set: { 'time_01_monday': ['xd'] } })
            .then(diet => {
                if (!diet) {
                    errors.diet = 'Brak diety';
                    res.status(404).json(errors);
                } else {
                    console.log(diet)
                    res.status(200).json(diet)
                }
            })
            .catch(err => console.log(err))
    } else {
        errors.diet = 'Brak diety';
        res.status(404).json(errors);
    }
})


module.exports = router;