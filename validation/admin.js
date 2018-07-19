const jwt = require('jsonwebtoken')

module.exports = function validateAdmin(token) {
  let isAdmin = false;
  jwt.verify(token, 'secret', (err, decoded) => {
    if (decoded.user.role == 'Admin') isAdmin = true;
  });
  return isAdmin;
};
