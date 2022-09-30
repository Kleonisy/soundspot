/* eslint-disable no-console */
require('dotenv').config();

const express = require('express');
const { sequelize } = require('./db/models');
const config = require('./config/config');

const exampleRouter = require('./routes/api/exampleRouter');
const usersRouter = require('./routes/api/usersRouter');
const bandsRouter = require('./routes/api/bandsRouter');
const spotsRouter = require('./routes/api/spotsRouter');

const app = express();
config(app);

const PORT = process.env.PORT ?? 4000;

app.use('/', exampleRouter);
app.use('/users', usersRouter);
app.use('/bands', bandsRouter);
app.use('/spots', spotsRouter);

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log('Can`t connect to DB');
    console.log(error.message);
  }
});
