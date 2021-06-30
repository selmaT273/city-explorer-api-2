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
  const allForecasts = weatherData.data.map(day => new Forecast(day));
  response.send(allForecasts);
});

function Forecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
