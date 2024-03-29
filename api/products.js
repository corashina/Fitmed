const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const passport = require('passport');

const validateAddProduct = require('../validation/product');

const Product = require('../models/Product');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Product.find().then(product => {
    if (product) {
      product.sort((a, b) => a.name - b.name).reverse();
      return res.status(200).json(product);
    } else {
      return res.status(400).json({ error: 'No products' })
    }
  })
})

router.post('/', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
  const { errors, isValid } = validateAddProduct(req.body);

  if (!isValid) return res.status(400).json(errors);

  Product.findOne({ name: req.body.name }).then(product => {
    if (product) {
      errors.name = 'Product already exists';
      return res.status(400).json(errors);
    } else {

      const newProduct = new Product({
        name: req.body.name,
        unit: req.body.unit,
        category: req.body.category,
      });

      newProduct
        .save()
        .then(product => res.status(200).json(product))
        .catch(err => res.status(400).json(errors));
    }
  });
})

router.delete('/', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
  Product.findOne({ name: req.query.name })
    .then(product => {
      product.remove()
      return res.status(200).json(product)
    });
})

module.exports = router;