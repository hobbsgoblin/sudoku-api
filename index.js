const https = require('https');
const fs = require('fs');
const gen = require('sudoku-generator');
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config({path: process.env.PWD + '/.env'});

// change this to desired origins
const allowedOrigins = "https://peacefulsudoku.com";

const options = {
  key: fs.readFileSync(process.env.PRIVATE_KEY_PATH),
  cert: fs.readFileSync(process.env.CERT_PATH),
};

const corsOptions = {origin: allowedOrigins};

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
