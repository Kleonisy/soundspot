/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const { sequelize } = require('./db/models');
const config = require('./config/config');

const exampleRouter = require('./routes/api/exampleRouter');

const app = express();
config(app);

const PORT = process.env.PORT ?? 4000;

app.use('/', exampleRouter);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log('Can`t connect to DB');
    console.log(error.message);
  }
});
