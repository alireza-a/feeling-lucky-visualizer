const express = require('express');
const rawData = require('./data.json');
const app = express();
const port = process.env.PORT || 5000;

app.get('/api/items', (req, res) => {
  res.json(rawData);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
