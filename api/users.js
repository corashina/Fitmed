const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const validateAdmin = require('../validation/admin');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

router.get('/test', (req, res) => res.json({ message: 'User api works' }));

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Podany adres email już istnieje';

      return res.status(400).json(errors);
    } else {

      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        birthday: req.body.birthday,
        sex: req.body.sex,
        phone: req.body.phone,
        role: 'User'
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.status(200).json(user))
            .catch(err => console.log(err));
        });
      });

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
      errors.email = 'Email nie istnieje';
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        jwt.sign(
          { id: user.id, user },
          'secret',
          (err, token) => {
            res.status(200).json({
              user,
              token
            });
          }
        );
      } else {
        errors.password = 'Nieprawidłowe hasło';
        return res.status(400).json(errors);
      }
    });
  })
})

router.get('/', (req, res) => {
  if (validateAdmin(req.query.jwt)) {
    User.find().then(users => {
      if (users) {
        users.sort((a, b) => a.firstname - b.lastname).reverse();
        return res.status(200).json(users);
      } else {
        return res.status(400).json({ error: 'Brak użytkowników' })
      }
    })
  } else res.status(400).json({ permission: 'Brak autoryzacji' })
})

module.exports = router;