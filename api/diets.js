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


router.post('/:id/addRecipe', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    const errors = {};
    const id = req.params.id;
    const data = req.body.data;
    const field = req.body.field;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        Diet.update({ _id: req.params.id }, { $addToSet: { [field]: data } })
            .then(diet => {
                if (!diet) {
                    errors.diet = 'Brak diety';
                    res.status(404).json(errors);
                } else {
                    Diet.findById({ _id: req.params.id }).then(e => res.status(200).json(e)).catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    } else {
        errors.diet = 'Brak diety';
        res.status(404).json(errors);
    }
})

router.post('/:id/deleteRecipe', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    const errors = {};
    const id = req.params.id;
    const field = req.body.field;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        Diet.update({ _id: req.params.id }, { $pull: { [field]: req.body.name } })
            .then(diet => {
                if (!diet) {
                    errors.diet = 'Brak diety';
                    res.status(404).json(errors);
                } else {
                    Diet.findById({ _id: req.params.id }).then(e => res.status(200).json(e)).catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    } else {
        errors.diet = 'Brak diety';
        res.status(404).json(errors);
    }
})


router.put('/:id/updateTime', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    const errors = {};
    const id = req.params.id;
    const time = req.body.time;
    let field = '';
    if (time > 6 && time < 11) field = 'time_01';
    else if (time > 10 && time < 15) field = 'time_02';
    else if (time > 14 && time < 19) field = 'time_03';
    else field = 'time_04';
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        Diet.update({ _id: id }, { $set: { [field]: time } })
            .then(diet => {
                if (!diet) {
                    errors.diet = 'Brak diety';
                    res.status(404).json(errors);
                } else {
                    Diet.findById({ _id: id }).then(e => res.status(200).json(e)).catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    } else {
        errors.diet = 'Brak diety';
        res.status(404).json(errors);
    }
})

router.post('/:id/addComment', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
    const errors = {};
    const id = req.params.id;
    const comment = req.body.comment;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        Diet.update({ _id: id, 'comments.data': { $ne: comment } }, { $push: { 'comments': { data: comment, date: new Date() } } })
            .then(diet => {
                if (!diet) {
                    errors.diet = 'Brak diety';
                    res.status(404).json(errors);
                } else {
                    Diet.findById({ _id: id }).then(e => res.status(200).json(e)).catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    } else {
        errors.diet = 'Brak diety';
        res.status(404).json(errors);
    }
})

router.put('/:id/deleteComment', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};
    const id = req.params.id;
    const comment = req.body.comment;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        Diet.update({ _id: id }, { $pull: { 'comments': { data: comment } } })
            .then(diet => {
                if (!diet) {
                    errors.diet = 'Brak diety';
                    res.status(404).json(errors);
                } else {
                    Diet.findById({ _id: id }).then(e => res.status(200).json(e)).catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    } else {
        errors.diet = 'Brak diety';
        res.status(404).json(errors);
    }
})

module.exports = router;