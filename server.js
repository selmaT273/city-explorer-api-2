'use strict';

const express = require('express');
const cors = require('cors');
const getMovies = require('./movies');
const getWeather = require('./weather');

require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/', (request, response) => {
  response.send('helllllloooo!');
});

app.get('/weather', getWeather);

app.get('/movies', getMovies);


// function handleError(err, response) {
//   response.status(500).send('Whoops. Internal error.');
// }

app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
