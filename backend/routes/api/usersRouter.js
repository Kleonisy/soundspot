const express = require('express');

const usersRouter = express.Router();
const { User } = require('../../db/models');

usersRouter.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json({ users });
});

module.exports = usersRouter;
