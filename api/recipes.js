const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const validateAddRecipe = require('../validation/recipe');

const Recipe = require('../models/Recipe');

router.get('/test', (req, res) => res.json({ message: 'Recipe api works' }));

router.get('/', (req, res) => {
  jwt.verify(req.query.jwt, 'secret', (err, decoded) => {
    if (decoded.user.role === 'Admin') {
      Recipe.find().then(recipe => {
        if (recipe) {
          recipe.sort((a, b) => a.name - b.name).reverse();
          return res.status(200).json(recipe);
        } else {
          return res.status(400).json({ error: 'No products' })
        }
      })
    } else res.status(400).json({ permission: 'User not authorized' })
  });
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
        .then(recipe => res.json(recipe))
        .catch(err => res.status(404).json(errors));
    }
  });
})

router.delete('/', (req, res) => {
  jwt.verify(req.query.jwt, 'secret', (err, decoded) => {
    if (decoded.user.role === 'Admin') {
      Recipe.findOne({ name: req.query.name }).then(recipe => {
        if (!recipe) {
          return res.status(400).json({ error: 'Recipe doesnt exist' });
        } else {
          recipe.remove().then(() => res.json({ success: true }))
        }
      });
    } else res.status(400).json({ permission: 'User not authorized' })
  });
})

module.exports = router;