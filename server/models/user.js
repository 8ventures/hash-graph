const mongoose = require('../db.js');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  favorites: [
    {
      symbol: { type: String, required: true },
      interval: { type: String, required: true },
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
