const express = require('express');
const https = require('https');

const router = express.Router();
require("dotenv").config();
const API_KEY = process.env.api_key

router.post('/', (req, res) => {
    const { city } = req.body;
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    https.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            const weatherData = JSON.parse(data);
            res.json(weatherData); // Send the weather data as a JSON response to the frontend
        });
    }).on('error', (error) => {
        console.error(error);
        res.status(500).json({ message: 'Error fetching weather data' });
    });
});

module.exports = router;
