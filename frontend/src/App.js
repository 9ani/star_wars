import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlanetCatalog from './components/PlanetCatalog';
import Search from './components/Search';
import './App.css';

const App = () => {
    const [searchResults, setSearchResults] = useState({
        people: [],
        planets: [],
        starships: []
    });

    return (
        <Router>
            <div>
                <header className="bg-black text-white p-3 mb-4">
                    <div className="container">
                        <h1 className="mb-0 ">Star Wars</h1>
                        <Search setSearchResults={setSearchResults} />
                    </div>
                </header>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<PlanetCatalog searchResults={searchResults} />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
