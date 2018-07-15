const express = require('express');
const router = express.Router();

const validateRegisterInput = require('../../validation/register');

const User = require('../../models/User');

router.get('/test', (req, res) => res.json({ message: 'User api works' }));

module.exports = router;