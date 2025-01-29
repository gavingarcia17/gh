import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

const apiKey = process.env.API_KEY;
const currentWeatherUrl = `https://api.weatherstack.com/current?access_key=${apiKey}&query=`;

app.use(express.static('public'));

app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    const apiUrl = `${currentWeatherUrl}${city}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});