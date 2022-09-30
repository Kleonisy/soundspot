const express = require('express');

const spotsRouter = express.Router();
const { Spot } = require('../../db/models');
const { SpotPhoto } = require('../../db/models');

spotsRouter.get('/', async (req, res) => {
  const spots = await Spot.findAll();
  const spotsWithPhoto = await Promise.all(spots.map(async (spot) => {
    const { dataValues } = await SpotPhoto.findOne({ where: { spotId: spot.id } });
    return { ...spot, photo: dataValues.photo, name: spot.dataValues.name };
  }));
  res.json({ spotsWithPhoto });
});

module.exports = spotsRouter;
