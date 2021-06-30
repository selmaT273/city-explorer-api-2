'use strict';

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const weatherData = require('./data/weather.json');

app.get('/', (request, response) => {
  response.send('helllllloooo!');
});

app.get('/weather', getWeather);

function getWeather(request, response) {
  const url = 'https://api.openweathermap.org/data/2.5/onecall';
  const query = {
    appid: process.env.WEATHER_API_KEY,
    lat: request.query.lat,
    lon: request.query.lon,
  }
  console.log(query);
  superagent.get(url)
    .query(query)
    .then(weatherResponse => {
      console.log(weatherResponse.body);
      response.status(200).send(weatherResponse.body);
    })
}

function Forecast(day) {
  this.date = day.datetime;
  this.description = day.weather.description;
}

function handleError(err, response) {
  response.status(500).send('Whoops. Internal error.');
}

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
