const jwt = require('jsonwebtoken');
const keys = require('../config/keys_dev');

module.exports = function validateAdmin(token) {
  let isAdmin = false;
  jwt.verify(token, keys.secretOrKey, (err, decoded) => {
    if (!decoded) return false;
    if (decoded.user.role == 'Admin') isAdmin = true;
  });
  return isAdmin;
};
