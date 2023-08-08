
const express = require("express");

const app = express();
const hostname = 'localhost';
require("dotenv").config();
const PORT = process.env.PORT || 10000;
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())

app.listen(PORT,hostname, () => {
    console.log(`Server is listening on port ${hostname} ${PORT}`)
});

app.post('/', async(req, res) => {
    const { city } = req.body;

    if (city.length < 1) {
        return res.status(400).json({ message: "City name is incorrect" });
    } else {
        try {
            const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.api_key}&units=metric`);
            res.send(weather.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error fetching weather data" });
        }
    }
});






