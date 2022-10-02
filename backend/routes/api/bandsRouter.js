const express = require('express');

const bandsRouter = express.Router();
const { Band, BandGenre, UserBand } = require('../../db/models');

bandsRouter.get('/', async (req, res) => {
  try {
    const bands = await Band.findAll();
    res.json({ bands });
  } catch (error) {
    res.json(error.message);
  }
});

bandsRouter.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const band = await Band.findOne({
      where: { id },
      include: [
        Band.Demo,
        Band.Creater,
        {
          model: BandGenre,
          include: BandGenre.Genre,
        },
        {
          model: UserBand,
          include: UserBand.User,
        },
      ],
    });
    console.log('!!!!!!!!', band);
    res.json({ band });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = bandsRouter;
