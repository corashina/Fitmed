const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = require('./config/keys_dev').mongoURI;

mongoose.Promise = global.Promise;


mongoose
  .connect(db, { useMongoClient: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use('/api/users', users);

const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server running on port ${port}`));
