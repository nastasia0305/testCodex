require('dotenv').config();
const express = require('express');
const cors = require('cors');
const corsConfig = require('./corsConfig');

const config = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(cors(corsConfig));
};

module.exports = config;
