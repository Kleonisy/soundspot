const express = require('express');

const bandsRouter = express.Router();
const { Band } = require('../../db/models');

bandsRouter.get('/', async (req, res) => {
  const bands = await Band.findAll();
  res.json({ bands });
});

bandsRouter.get('/:name', async (req, res) => {
  const { name } = req.params;
  const band = await Band.findOne({ where: { name } });
  res.json({ band });
});

module.exports = bandsRouter;
