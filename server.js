'use strict';

const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.send('helllllloooo!');
});

const weatherData = require('./data/weather.json');

app.get('/weather', (request, response) => {
  response.json(weatherData);
});


app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
