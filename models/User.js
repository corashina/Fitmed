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
    type: String, enum: ['Male', 'Female'],
    required: true
  },
  phone: {
    type: Number,
    required: false
  },
  role: {
    type: String, enum: ['User', 'Admin', 'Dietician'],
    required: true
  }

}, { timestamps: true })

module.exports = User = mongoose.model('User', UserSchema);