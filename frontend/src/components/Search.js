import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ setSearchResults }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/search?q=${query}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error during search:', error);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-container">
            <input
                type="text"
                className="search-input"
                placeholder="Search for people, planets, starships..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button className="search-button" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};

export default Search;
