const express = require('express');
const fetch = require('node-fetch');
const _ = require('lodash');

const { key } = require('./config.json');
const data = require('./data.json');
const origins = data.map(house => `${house.latitude},${house.longitude}`);

const app = express();

const request = (origins, destination, mode = 'transit') => {
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origins}&destinations=${destination}&key=${key}&mode=${mode}`;
  return fetch(url).then(res => res.json());
};

const getDurations = (origins, destination) => {
  const originGroups = _.chunk(origins, 25).map(chunk => chunk.join('|'));
  return Promise.all(
    originGroups.map(origins =>
      request(origins, destination)
        .then(res => res.rows)
        .then(rows =>
          rows.map(row => {
            const duration = row.elements[0].duration;
            return duration === undefined ? null : duration.value;
          })
        )
    )
  ).then(durationGroups => _.flatten(durationGroups));
};

app.get('/api/items', (req, res) => {
  const address = req.query.destination;
  fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
  )
    .then(res => res.json())
    .then(res => res.results[0].geometry.location)
    .then(des => {
      getDurations(origins, `${des.lat},${des.lng}`)
        .then(durations => {
          const validData = data
            .map((item, index) => {
              return Object.assign({}, item, { duration: durations[index] });
            })
            .filter(item => item.duration !== null);
          res.json({
            data: validData,
            destination: { latitude: des.lat, longitude: des.lng }
          });
        })
        .catch(err => {
          console.log(err);
          res.json({ error: 'nothing to show :(' });
        });
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
