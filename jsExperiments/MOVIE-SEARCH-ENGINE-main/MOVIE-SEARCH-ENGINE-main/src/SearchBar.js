// SearchBar.js
import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=fe2f6c44&s=${query}`);
      onSearch(response.data); // Assuming the API returns movie information
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle errors here
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button> {/* Call handleSearch function on button click */}
    </div>
  );
};

export default SearchBar;
