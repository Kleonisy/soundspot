const express = require('express');

const userRouter = express.Router();
const {
  User, UserInstrument, UserGenre, UserBand, Rating,
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

module.exports = userRouter;
