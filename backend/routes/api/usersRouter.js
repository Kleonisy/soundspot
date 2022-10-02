/* eslint-disable max-len */
const express = require('express');

const usersRouter = express.Router();
const {
  User, Instrument, UserInstrument, UserGenre, UserBand, Raiting,
} = require('../../db/models');

usersRouter.get('/', async (req, res) => {
  try {
    const users = await User.findAll({ raw: true });
    const instruments = await Instrument.findAll({ raw: true });
    const usersWithExtraStuff = await Promise.all(users.map(async (user) => {
      let hisInstruments = await UserInstrument.findAll({ where: { userId: user.id } }, { raw: true });
      hisInstruments = await Promise.all(hisInstruments.map(async (instrument) => {
        const instr = await Instrument.findOne({ where: { id: instrument.dataValues.instrumentId } }, { raw: true });
        return instr.dataValues.instrument;
      }));
      const rating = await Raiting.findAll({ where: { userTargetId: user.id } }, { raw: true });
      const averageRating = rating.reduce((acc, el) => acc + el.dataValues.raiting, 0) / rating.length;
      return { ...user, extraStuff: { hisInstruments, averageRating, numberOfVoters: rating.length } };
    }));
    
    const usersData = await User.findAll({
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
    res.json({ usersWithExtraStuff, usersData, instruments });
  } catch(error) {
    res.json(error.message);
  }
});

usersRouter.post('/search', async (req, res) => {
  const {
    filters, orderByRating, orderByName, inputText,
  } = req.body;
  const users = await User.findAll({ raw: true });
  const instruments = await Instrument.findAll({ raw: true });
  let usersWithExtraStuff = await Promise.all(users.map(async (user) => {
    let hisInstruments = await UserInstrument.findAll({ where: { userId: user.id } }, { raw: true });
    hisInstruments = await Promise.all(hisInstruments.map(async (instrument) => {
      const instr = await Instrument.findOne({ where: { id: instrument.dataValues.instrumentId } }, { raw: true });
      return instr.dataValues.instrument;
    }));
    const rating = await Raiting.findAll({ where: { userTargetId: user.id } }, { raw: true });
    const averageRating = rating.reduce((acc, el) => acc + el.dataValues.raiting, 0) / rating.length;
    return { ...user, extraStuff: { hisInstruments, averageRating, numberOfVoters: rating.length } };
  }));
  usersWithExtraStuff = usersWithExtraStuff.filter((user) => {
    for (let i = 0; i < filters.length; i += 1) {
      if (filters[i]) {
        if (!user.extraStuff.hisInstruments.includes(instruments[i].instrument)) return false;
      }
    }
    return true;
  });
  if (inputText) {
    usersWithExtraStuff = usersWithExtraStuff.filter((user) => user.login.toLowerCase().includes(inputText.toLowerCase()));
  }
  if (orderByRating) {
    usersWithExtraStuff = usersWithExtraStuff
      .sort((user1, user2) => user1.extraStuff.averageRating - user2.extraStuff.averageRating);
  }
  if (orderByName) {
    usersWithExtraStuff = usersWithExtraStuff
      .sort((user1, user2) => (user1.login > user2.login ? 1 : -1));
  }
  res.json({ usersWithExtraStuff });
});

module.exports = usersRouter;
