const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../models/user.js');

const controllers = {};

controllers.hello = (req, res) => {
  res.status(200).send('Hello World!');
};

controllers.createUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('❌ Error creating user:', errors);
    return res.status(400).send(errors);
  }
  const { username, password, email, firstName, lastName } = req.body;

  if (User.findOne({ $or: [{ username }, { email }] })) {
    console.log('❌ Error creating user: username or email already exists');
    return res.status(400).send('Username or email already exists');
  }

  hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = User.create({
    username,
    password: hashedPassword,
    email,
    firstName,
    lastName,
  });
  newUser.save((err, user) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      console.log('✅ User created:', user);
      return res.status(201).send(user);
    }
  });
};

module.exports = controllers;
