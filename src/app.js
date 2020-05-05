const express = require('express');

require('dotenv').config();

const app = express();

app.use(express.json());

app.post('/signup', (req, res) => {
  console.log(req);
  res.send('s');
});

module.exports = app;
