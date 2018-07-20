const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const validateAddProduct = require('../validation/product');
const validateAdmin = require('../validation/admin')

const Product = require('../models/Product');

router.get('/test', (req, res) => res.json({ message: 'Product api works' }));

router.get('/', (req, res) => {
  if (validateAdmin(req.query.jwt)) {
    Product.find().then(product => {
      if (product) {
        product.sort((a, b) => a.name - b.name).reverse();
        return res.status(200).json(product);
      } else {
        return res.status(400).json({ error: 'No products' })
      }
    })
  } else res.status(400).json({ permission: 'User not authorized' })
})

router.post('/', (req, res) => {
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

router.delete('/', (req, res) => {
  if (validateAdmin(req.query.jwt)) {
    Product.findOne({ name: req.query.name }).then(product => {
      if (!product) {
        return res.status(400).json({ error: 'Product doesnt exist' });
      } else {
        product.remove().then(() => res.json(product))
      }
    });
  } else res.status(400).json({ permission: 'User not authorized' })
})

module.exports = router;