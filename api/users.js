const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

router.get('/test', (req, res) => res.json({ message: 'User api works' }));

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {

      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2,
        birthday: req.body.birthday,
        sex: req.body.sex,
        phone: req.body.phone,
        role: 'User'
      });

      newUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  });
});

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {

    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    if (password == user.password) {
      jwt.sign(
        { id: user.id, user },
        'secret',
        { expiresIn: 3600 },
        (err, token) => {
          res.json({
            user,
            token
          });
        }
      );
    } else {
      errors.password = 'Password incorrect';
      return res.status(400).json(errors);
    }
  });
})

router.get('/current', (req, res) => {
  console.log(req.headers.token)
  jwt.verify(req.headers.token, 'secret', (err, decoded) => {
    if (decoded) res.json(decoded)
    else res.json({ success: false })
  });
})

router.get('/users', (req, res) => {
  jwt.verify(req.query.jwt, 'secret', (err, decoded) => {
    if (decoded.user.role === 'Admin') {
      User.find().then(users => {
        if (users) {
          users.sort((a, b) => a.firstname - b.lastname).reverse();
          return res.status(200).json(users);
        } else {
          return res.status(400).json({ error: 'No users' })
        }
      })
    } else res.status(400).json({ permission: 'Denied' })
  });
})


module.exports = router;