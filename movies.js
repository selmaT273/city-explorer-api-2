const superagent = require('superagent');

function getMovies(request, response) {
  const url = 'https://api.themoviedb.org/3/search/movie';
  const query = {
    api_key: process.env.MOVIE_API_KEY,
    query: request.query.search_query,
  }
  superagent.get(url)
    .query(query)
    .then(movieResponse => {
    const movies = movieResponse.body.results.map(movie => new Movie(movie));
    response.status(200).send(movies);
    })
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