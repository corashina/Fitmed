const express = require('express');
const router = express.Router();
const passport = require('passport');

const validateSupplementation = require('../validation/supplementation');

const Supplementation = require('../models/Supplementation');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Supplementation.findOne({ user_id: req.user._id })
    .then(supplementation => {
      if (!supplementation) {
        errors.supplementation = 'Brak suplementacji';
        res.status(404).json(errors);
      } else {
        res.status(200).json(supplementation)
      }
    })
    .catch(err => console.log(err))
})

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateSupplementation(req.body);

  if (!isValid) return res.status(400).json(errors);

  Supplementation.findOne({ user_id: req.user._id }).then(supplementation => {
    if (supplementation) {
      errors.supplementation = 'Suplementacja juz istnieje';
      return res.status(400).json(errors);
    } else {

      const newSupplementation = new Supplementation({
        user_id: req.user._id,
        height: req.body.height,
        weight: req.body.weight,
        meals: req.body.meals,
        selectedAim: req.body.selectedAim,
        selectedAllergies: req.body.selectedAllergies,
        selectedIllnesses: req.body.selectedIllnesses,
        selectedAfflictions: req.body.selectedAfflictions,
      });

      newSupplementation
        .save()
        .then(supplementation => res.status(200).json(supplementation))
        .catch(err => console.log(err));
    }
  })
})

module.exports = router;