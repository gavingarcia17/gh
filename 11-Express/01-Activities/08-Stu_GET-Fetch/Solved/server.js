const express = require('express');
const path = require('path');

const petData = require('./db/animals.json');

const PORT = 3001;

const app = express();



app.use(express.static('public'));

app.use((req, res, next) => {
  console.log("Hello!");
  res.send("ACCESS DENIED");
})

app.get('/', (req, res) => {
  console.log("DEFAULT");
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/pets', (req, res) => {
  console.log("API ROUTE")
  return res.json(petData);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
