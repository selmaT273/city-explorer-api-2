'use strict';

const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const weatherData = require('./data/weather.json');

app.get('/', (request, response) => {
  response.send('helllllloooo!');
});

app.get('/weather', (request, response) => {
  try {
    const allForecasts = weatherData.data.map(day => new Forecast(day));
    response.send(alForecasts);
  } catch(err) {
    handleError(err, response);
  }
});

function Forecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

function handleError(err, response) {
  response.status(500).send('Whoops. Internal error.');
}

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
