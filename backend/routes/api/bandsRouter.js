const express = require('express');

const bandsRouter = express.Router();
const { Band } = require('../../db/models');

bandsRouter.get('/', async (req, res) => {
  const bands = await Band.findAll();
  res.json({ bands });
});

module.exports = bandsRouter;
