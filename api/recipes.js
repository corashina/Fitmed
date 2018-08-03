const express = require('express');
const router = express.Router();
const passport = require('passport');

const validateAddRecipe = require('../validation/recipe');

const Recipe = require('../models/Recipe');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Recipe.find().then(recipe => {
    if (recipe) {
      recipe.sort((a, b) => a.name - b.name).reverse();
      return res.status(200).json(recipe);
    } else {
      return res.status(400).json({ error: 'No products' })
    }
  })
})

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateAddRecipe(req.body);

  if (!isValid) return res.status(400).json(errors);

  Recipe.findOne({ name: req.body.name }).then(recipe => {
    if (recipe) {
      errors.name = 'Recipe already exists';
      return res.status(400).json(errors);
    } else {

      const newRecipe = new Recipe({
        name: req.body.name,
        calories: req.body.calories,
        protein: req.body.protein,
        fat: req.body.fat,
        carbon: req.body.carbon,
        ingredients: req.body.ingredients,
        execution: req.body.execution,
        exclude: req.body.exclude
      });

      newRecipe
        .save()
        .then(recipe => res.status(200).json(recipe))
        .catch(err => console.log(err));
    }
  });
})

router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Recipe.findOne({ name: req.query.name })
    .then(recipe => {
      recipe.remove();
      res.status(200).json(recipe)
    })
})

module.exports = router;