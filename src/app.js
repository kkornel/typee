const express = require('express');

require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/signup', (req, res) => {
  console.log(req);
});

module.exports = app;
