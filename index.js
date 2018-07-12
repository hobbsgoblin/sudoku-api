const https = require('https');
const fs = require('fs');
const gen = require('./generator');
const express = require('express');
const app = express();
const cors = require('cors');

const options = {
  key: fs.readFileSync('/var/www/privkey.pem'),
  cert: fs.readFileSync('/var/www/cert.pem'),
};

//const corsOptions = {origin: 'https://peacefulsudoku.com'}
const corsOptions = {origin: "*"}

app.get('/', cors(corsOptions), (req, res) => {
  try {
    const difficulty = req.query.difficulty;
    const puzzle = gen.generate(difficulty);
    res.status(200).json(puzzle);
  } catch {
    res.status(400).send('Bad Request');
  }
});

https.createServer(options, app).listen(2001);
