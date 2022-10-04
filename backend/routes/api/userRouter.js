/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const express = require('express');
const bcrypt = require('bcrypt');

const userRouter = express.Router();
const {
  User, UserInstrument, UserGenre, UserBand, Rating, Instrument, Genre,
} = require('../../db/models');

userRouter.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    if (id) {
      const user = await User.findOne({
        where: { id },
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
            model: Rating,
          },
        ],
      });

      res.json(user);
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

userRouter.put('/:id', async (req, res) => {
  const { userId } = req.session;
  const { login, email, password } = req.body;

  try {
    const changeUser = await User.findOne({ where: { id: userId } });
    const userWithEmail = await User.findOne({ where: { email } });
    const userWithLogin = await User.findOne({ where: { login } });

    const regEx = /.+@.+\..+/;

    if (userWithEmail && email !== changeUser.email) {
      res.json({ error: 'User with this email already exists' });
    } else if (userWithLogin && login !== changeUser.login) {
      res.json({ error: 'User with this login already exists' });
    } else if (login.length === 0) {
      res.json({ error: 'Login cannot be zero length' });
    } else if (!regEx.test(email)) {
      res.json({ error: 'Wrong email format' });
    } else if (password.length === 0) {
      await changeUser.update({ login, email });
      res.json(changeUser);
    } else if (password.length < 6 && password.length > 0) {
      res.json({ error: 'Change your password! Length less than 6 characters' });
    } else {
      const hash = await bcrypt.hash(password, 10);
      await changeUser.update({ login, email, password: hash });
      res.json(changeUser);
    }
  } catch (error) {
    res.json(error.message);
  }
});

userRouter.put('/:id/rating', async (req, res) => {
  const { id, rating } = req.body;
  const { userId } = req.session;
  try {
    const hasRating = await Rating.findOne({ where: { userSourceId: userId, userTargetId: id } });
    if (hasRating) {
      hasRating.rating = rating;
      await hasRating.save();
      const user = await User.findOne({
        where: { id },
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
            model: Rating,
          },
        ],
      });
      res.json(user);
    } else {
      await Rating.create({
        userSourceId: userId,
        userTargetId: id,
        rating,
      });
      const user = await User.findOne({
        where: { id },
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
            model: Rating,
          },
        ],
      });
      res.json(user);
    }
  } catch (error) {
    res.json(error.message);
  }
});

userRouter.put('/:userid/userprofile', async (req, res) => {
  const { userid } = req.params;
  const {
    filters, filtersGenre, inputContact, inputTextArea,
  } = req.body;
  try {
    const thisUser = await User.findOne({ where: { id: userid } });
    if (inputTextArea) {
      await thisUser.update({ about: inputTextArea });
    }
    if (inputContact) {
      await thisUser.update({ contact: inputContact });
    }
    const erasedInstruments = await UserInstrument.destroy({ where: { userId: userid } });
    const erasedGenres = await UserGenre.destroy({ where: { userId: userid } });
    const answer = await Promise.all(filters.map(async (instr, i) => {
      if (instr) {
        const created = await UserInstrument.create({ userId: userid, instrumentId: i + 1 });
        return created;
      }
    }));
    const answer1 = await Promise.all(filtersGenre.map(async (genre, i) => {
      if (genre) {
        const created = await UserGenre.create({ userId: userid, genreId: i + 1 });
        return created;
      }
    }));
    const users = await User.findAll({ raw: true });
    const instruments = await Instrument.findAll({ raw: true });
    const genres = await Genre.findAll({ raw: true });
    const usersWithExtraStuff = await Promise.all(users.map(async (user) => {
      let hisInstruments = await UserInstrument.findAll({ where: { userId: user.id } }, { raw: true });
      hisInstruments = await Promise.all(hisInstruments.map(async (instrument) => {
        const instr = await Instrument.findOne({ where: { id: instrument.dataValues.instrumentId } }, { raw: true });
        return instr.dataValues.instrument;
      }));
      let hisGenres = await UserGenre.findAll({ where: { userId: user.id } }, { raw: true });
      hisGenres = await Promise.all(hisGenres.map(async (genre) => {
        const genr = await Genre.findOne({ where: { id: genre.dataValues.genreId } }, { raw: true });
        return genr.dataValues.genre;
      }));
      const rating = await Rating.findAll({ where: { userTargetId: user.id } }, { raw: true });
      const averageRating = rating.reduce((acc, el) => acc + el.dataValues.rating, 0) / rating.length;
      return {
        ...user,
        extraStuff: {
          hisInstruments, hisGenres, averageRating, numberOfVoters: rating.length,
        },
      };
    }));
    res.json({ usersWithExtraStuff });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = userRouter;
