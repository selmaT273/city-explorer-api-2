const e = require('express');
const superagent = require('superagent');
const cache = {};

function getMovies(request, response) {
  const key = request.query.search_query;
  if(!cache[key]) {
    const url = 'https://api.themoviedb.org/3/search/movie';
    const query = {
      api_key: process.env.MOVIE_API_KEY,
      query: request.query.search_query,
    }
    superagent.get(url)
      .query(query)
      .then(movieResponse => {
      const movies = movieResponse.body.results.map(movie => new Movie(movie));
      cache[key] = {};
      cache[key].timestamp = Date.now();
      cache[key].data = movies;
      console.log('movie cache miss');
      response.status(200).send(movies);
      })
  } else {
    let cachedData = cache[key].data
    console.log('movie cache hit')
    response.status(200).send(cachedData);
  }
  
}
  
function Movie(movie) {
  this.title = movie.original_title;
  this.overview = movie.overview;
  this.average_votes = movie.vote_average;
  this.total_votes = movie.vote_count;
  this.image_url = movie.poster_path;
  this.popularity = movie.popularity;
  this.released_on = movie.release_date;
}

module.exports = getMovies;