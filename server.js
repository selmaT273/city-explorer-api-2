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

app.get('/movies', getMovies);

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
      const dailyForecasts = weatherResponse.body.daily.map(day => new Forecast(day));
      response.status(200).send(dailyForecasts);
    })
}

function getMovies(request, response) {
  const url = 'https://api.themoviedb.org/3/search/movie';
  const query = {
    api_key: process.env.MOVIE_API_KEY,
    query: request.query.search_query,
  }
  superagent.get(url)
    .query(query)
    .then(movieResponse => {
      response.status(200).send(movieResponse.body.results);
    })
}

function Forecast(day) {
  // Assuming we are passing in weatherResponse.body.daily[i] as the day
  const milli = day.dt * 1000;
  const dateObject = new Date(milli);
  console.log(dateObject.toISOString());
  this.date = dateObject.toISOString().substr(0, 10);
  this.description = day.weather[0].description;
}

function handleError(err, response) {
  response.status(500).send('Whoops. Internal error.');
}

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
