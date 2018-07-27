const jwt = require('jsonwebtoken');
const keys = require('../config/keys_dev');

module.exports = function authenticate(token) {
  let user = false;
  jwt.verify(token, keys.secretOrKey, (err, decoded) => {
    if (!decoded) return user;
    if (decoded) user = decoded.user;
    if (err) console.log(err)
  });
  return user;
};
