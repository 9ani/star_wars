const express = require('express');
const axios = require('axios');
const router = express.Router();

const SWAPI_BASE_URL = 'https://swapi.dev/api';

router.get('/planets', async (req, res) => {
    try {
        const response = await axios.get(`${SWAPI_BASE_URL}/planets/`);
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch planets' });
    }
});

router.get('/search', async (req, res) => {
    const query = req.query.q;
    try {
        const [people, planets, starships] = await Promise.all([
            axios.get(`${SWAPI_BASE_URL}/people/?search=${query}`),
            axios.get(`${SWAPI_BASE_URL}/planets/?search=${query}`),
            axios.get(`${SWAPI_BASE_URL}/starships/?search=${query}`),
        ]);

        res.json({
            people: people.data.results,
            planets: planets.data.results,
            starships: starships.data.results,
        });
    } catch (error) {
        res.status(500).json({ error: 'Search failed' });
    }
});

module.exports = router;
