const brcypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  if (!password) {
    response.status(400).send({
      error: 'expect `password` to be defined',
    });
    return;
  }
  if (password.length < 3) {
    response.status(400).send({
      error: 'expect `password` to have length at least 3 character long',
    });
    return;
  }
  const saltRounds = 10;
  const passwordHash = await brcypt.hash(password, saltRounds);
  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 });
  response.json(users);
});

module.exports = usersRouter;
