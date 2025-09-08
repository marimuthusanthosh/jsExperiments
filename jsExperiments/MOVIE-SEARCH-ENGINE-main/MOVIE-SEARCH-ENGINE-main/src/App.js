import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from 'react-router-dom';

const API_KEY = 'fe2f6c44'; // Replace with your actual OMDB API key

const MovieList = ({ movies }) => {
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const imdbIDs = movies.map(movie => movie.imdbID);
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbIDs.join(',')}&plot=short`);
        const detailsMap = {};
        response.data.forEach(movie => {
          detailsMap[movie.imdbID] = {
            imdbRating: movie.imdbRating || 'N/A',
            Genre: movie.Genre || 'N/A',
          };
        });
        setMovieDetails(detailsMap);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movies]);

  return (
    <div className="movie-list">
      {movies && movies.map(movie => (
        <div key={movie.imdbID} className="movie-info">
          <Link to={`/movie/${movie.imdbID}`}>
            <img src={movie.Poster} alt={`Poster of ${movie.Title}`} />
          </Link>
          <div>
            <h2>{movie.Title}</h2>
            <p>Year: {movie.Year}</p>
            {/* <p>IMDb Rating: {movieDetails[movie.imdbID]?.imdbRating ?? 'N/A'}</p>
            <p>Genres: {movieDetails[movie.imdbID]?.Genre ?? 'N/A'}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

const MovieDetail = () => {
  const { imdbID } = useParams();
  const [movieDetail, setMovieDetail] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`);
        setMovieDetail(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetail();
  }, [imdbID]);

  if (!movieDetail) return <div>Loading...</div>;

  return (
    <div className="movie-detail">
      <h1>{movieDetail.Title}</h1>
      <img src={movieDetail.Poster} alt={`Poster of ${movieDetail.Title}`} />
      <p>{movieDetail.Plot}</p>
      <div className="details-center">
        <p>Director: {movieDetail.Director}</p>
        <p>Writers: {movieDetail.Writer}</p>
        <p>Actors: {movieDetail.Actors}</p>
        <p>Release Date: {movieDetail.Released}</p>
        <p>Runtime: {movieDetail.Runtime}</p>
        <p>Language: {movieDetail.Language}</p>
        <p>Country: {movieDetail.Country}</p>
        <p>Awards: {movieDetail.Awards}</p>
        <p>IMDb Rating: {movieDetail.imdbRating}</p>
        <p>Genres: {movieDetail.Genre}</p>
      </div>
    </div>
  );
};

const App = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const searchMovie = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
      setMovies(response.data.Search);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchMovie();
    }
  };

  return (
    <Router>
      <div className="App">
        <div className="h1">
          <h1>Welcome To Our MovieSpace..</h1>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown} // Call searchMovie on Enter key press
          />
          <button onClick={searchMovie}>Search</button>
        </div>
        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
          <Route path="/movie/:imdbID" element={<MovieDetail />} />
          {/* Add other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
