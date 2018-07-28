const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const users = require('./api/users');
const products = require('./api/products');
const recipes = require('./api/recipes');
const diets = require('./api/diets');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = require('./config/keys_dev').mongoURI;

mongoose.Promise = global.Promise;

mongoose
  .connect(db, { useMongoClient: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require('./validation/passport')(passport);

app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/recipes', recipes);
app.use('/api/diets', diets);

app.use(express.static('client/build'));

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server running on port ${port}`));
