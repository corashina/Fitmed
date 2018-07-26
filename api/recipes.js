const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const validateAdmin = require('../validation/admin');
const validateAddRecipe = require('../validation/recipe');

const Recipe = require('../models/Recipe');

router.get('/test', (req, res) => res.json({ message: 'Recipe api works' }));

router.get('/', (req, res) => {
  Recipe.find().then(recipe => {
    if (recipe) {
      recipe.sort((a, b) => a.name - b.name).reverse();
      return res.status(200).json(recipe);
    } else {
      return res.status(400).json({ error: 'No products' })
    }
  })
})

router.post('/', (req, res) => {
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
        .catch(err => res.status(404).json(errors));
    }
  });
})

router.delete('/', (req, res) => {
  if (validateAdmin(req.query.jwt)) {
    Recipe.findOne({ name: req.query.name }).then(recipe => {
      if (!recipe) {
        return res.status(400).json({ errors: "Przepis nie istnieje" });
      } else {
        recipe.remove().then(() => res.json(recipe))
      }
    });
  } else res.status(400).json({ errors: "Brak autoryzacji" })

})

module.exports = router;