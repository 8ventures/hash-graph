const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

const User = require('../models/user.js');

const controllers = {};

controllers.hello = async (req, res) => {
  res.status(200).send(req.session);
};

controllers.createUser = async (req, res) => {
  console.log('🔑 Creating user');

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('❌ Error creating user:', errors);
    return res
      .status(400)
      .send('❌ Error creating user:' + JSON.stringify(errors));
  }
  const { username, password, email, firstName, lastName } = req.body;

  if (await User.findOne({ $or: [{ username }, { email }] })) {
    console.log('❌ Error creating user: username or email already exists');
    return res.status(409).send('Username or email already exists');
  }

  hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      firstName,
      lastName,
    });
    console.log('✅ User created:', newUser);
    req.session.user = newUser.username;
    return res.status(201).send(req.session.user);
  } catch (error) {
    console.log('❌ Error creating user:', error);
    return res.status(500).send(error);
  }
};

controllers.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    console.log('❌ Error logging in: username and password required');
    return res.status(400).send('Username and password required');
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      console.log('❌ Error logging in: user not found');
      return res.status(400).send('User not found');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      console.log('❌ Error logging in: incorrect password');
      return res.status(400).send('Incorrect password');
    }
    console.log('✅ User logged in');
    req.session.user = user.username;
    return res.status(200).send(req.session.user);
  } catch (error) {
    console.log('❌ Error logging user:', error);
    return res.status(500).send(error);
  }
};

controllers.logout = async (req, res) => {
  console.log('🔑 Logging out user');
  req.session.destroy();
  console.log('✅ User logged out');
  return res.status(200).send('User logged out');
};

controllers.getUser = async (req, res) => {
  console.log('🔑 Getting user');
  try {
    const user = await User.findOne({ username: req.session.user });
    if (!user) {
      console.log('❌ Error getting user: user not found');
      return res.status(400).send('User not found');
    }
    console.log('✅ User found');
    return res.status(200).send(user);
  } catch (error) {
    console.log('❌ Error getting user:', error);
    return res.status(500).send(error);
  }
};

controllers.addFavorite = async (req, res) => {
  console.log('🔑 Adding favorite');
  const favorite = req.body;
  console.log(favorite);
  if (!favorite) {
    console.log('❌ Error adding favorite: favorite required');
    return res.status(400).send('Favorite required');
  }
  try {
    const user = await User.findOne({ username: req.session.user });
    if (!user) {
      console.log('❌ Error adding favorite: user not found');
      return res.status(400).send('User not found');
    }
    const existingFavorite = user.favorites.find(
      (f) => f.symbol === favorite.symbol && f.interval === favorite.interval
    );

    if (existingFavorite) {
      console.log('❌ Error adding favorite: favorite already exists');
      return res.status(409).send('Favorite already exists');
    }
    user.favorites.push(favorite);
    await user.save();
    console.log('✅ Favorite added:', favorite);
    return res.status(200).send(user);
  } catch (error) {
    console.log('❌ Error adding favorite:', error);
    return res.status(500).send(error);
  }
};

controllers.removeFavorite = async (req, res) => {
  console.log('🔑 Removing favorite');
  const favorite = req.body;
  if (!favorite) {
    console.log('❌ Error removing favorite: favorite required');
    return res.status(400).send('Favorite required');
  }

  try {
    const user = await User.findOne({ username: req.session.user });
    if (!user) {
      console.log('❌ Error removing favorite: user not found');
      return res.status(400).send('User not found');
    }
    const existingFavorite = user.favorites.find(
      (f) => f.symbol === favorite.symbol && f.interval === favorite.interval
    );

    if (!existingFavorite) {
      console.log('❌ Error removing favorite: favorite not found');
      return res.status(400).send('Favorite not found');
    }
    user.favorites = user.favorites.filter(
      (f) => f.symbol !== favorite.symbol || f.interval !== favorite.interval
    );
    await user.save();
    console.log('✅ Favorite removed:', favorite);
    return res.status(200).send(user);
  } catch (error) {
    console.log('❌ Error removing favorite:', error);
    return res.status(500).send(error);
  }
};

module.exports = controllers;
