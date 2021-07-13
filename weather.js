const superagent = require('superagent');

function getWeather(request, response) {
  const url = 'https://api.openweathermap.org/data/2.5/onecall';
  const query = {
    appid: process.env.WEATHER_API_KEY,
    lat: request.query.lat,
    lon: request.query.lon,
    }
    superagent.get(url)
      .query(query)
      .then(weatherResponse => {
        const dailyForecasts = weatherResponse.body.daily.map(day => new Forecast(day));
        response.status(200).send(dailyForecasts);
    })
}

function Forecast(day) {
  // Assuming we are passing in weatherResponse.body.daily[i] as the day
  const milli = day.dt * 1000;
  const dateObject = new Date(milli);
  this.date = dateObject.toISOString().substr(0, 10);
  this.description = day.weather[0].description;
}

module.exports = getWeather;