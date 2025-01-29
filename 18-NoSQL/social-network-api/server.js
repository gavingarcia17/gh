const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3002; // Change the port number here
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

const server = app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = { app, server };