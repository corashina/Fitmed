const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode')
const bcrypt = require('bcrypt');
const keys = require('../config/keys_dev');
const passport = require('passport');
const nodemailer = require('nodemailer');

const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const User = require('../models/User');

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
        plan: req.body.plan,
        isDietician: false,
        isAdmin: false,
        isVerified: false
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
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (!user.isVerified) {
              let transporter = nodemailer.createTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: { user: "fitmed@gmail.com", pass: "test123" },
              });

              let mailOptions = {
                from: '"Fitmed 👻" <fitmed@gmail.com>',
                to: user.email,
                subject: 'Potwierdz adres email',
                text: `${token}`,
                html: `'<p>Potwierdz email <a href="http://localhost:3000/potwierdz-email/${token}">http://localhost:3000/potwierdz-email/${token}</a></p>'`
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) return console.log(error);
              });
            }

            res.status(200).json({
              user,
              token: 'Bearer ' + token
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


router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const id = req.params.id;
  User.findOne({ _id: id })
    .then(user => res.status(200).json(user))
    .catch(err => console.log(err))

})

router.get('/', passport.authenticate('jwt-admin', { session: false }), (req, res) => {
  User.find().then(users => {
    if (users) {
      users.sort((a, b) => a.firstname - b.lastname).reverse();
      return res.status(200).json(users);
    } else {
      return res.status(400).json({ error: 'Brak użytkowników' })
    }
  })
})

router.get('/confirm/:token', (req, res) => {
  const token = req.params.token;
  const decoded = jwt_decode(token);
  if (decoded.user) {
    if (decoded.user.isVerified) {
      return res.status()
    } else {
      User.update({ _id: decoded.id }, { '$set': { 'isVerified': true } })
        .then(user => {
          decoded.user.isVerified = true;
          return res.status(200).json(decoded.user)
        })
    }
  } else {
    res.status(400).json({ errors: `Token expired` })
  }
})


module.exports = router;