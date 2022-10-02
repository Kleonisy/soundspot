const express = require('express');

const usersRouter = express.Router();
const {
  User, UserInstrument, UserGenre, UserBand, Raiting,
} = require('../../db/models');

usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'login',
        'email',
        'about',
        'latitude',
        'longitude',
        'contact',
        'photo',
      ],
      include: [
        User.Demo, User.Band,
        {
          model: UserInstrument,
          include: UserInstrument.Instrument,
        },
        {
          model: UserGenre,
          include: UserGenre.Genre,
        },
        {
          model: UserBand,
          include: UserBand.Band,
        },
        {
          model: Raiting,
        },
      ],
    });
    res.json({ users });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = usersRouter;
