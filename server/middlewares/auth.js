const User = require('../models/user.js');

const authMiddleware = async (req, res, next) => {
  if (!req.session.user) {
    console.log('❌ Error authenticating user: no session found');
    return res.status(401).send('Unauthorized');
  } else {
    console.log('✅ User authenticated');
    next();
  }
};

module.exports = authMiddleware;
