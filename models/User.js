const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  birthday: {
    type: Date,
    required: true
  },
  sex: {
    type: String, enum: ['Mężczyzna', 'Kobieta'],
    required: true
  },
  phone: {
    type: Number,
    required: false
  },
  plan: {
    type: Number,
    required: true
  },
  isDietician: {
    type: Boolean,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
}, { timestamps: true })

module.exports = User = mongoose.model('User', UserSchema);