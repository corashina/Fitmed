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
  birthday: {
    type: Date,
    required: true
  },
  sex: {
    type: String, enum: ['M', 'F'],
    required: true
  },
  phone: {
    type: Number,
    required: false
  }

}, { timestamps: true })

module.exports = User = mongoose.model('User', UserSchema);