// Configuration
require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

// Untappd API
app.get('/api', async (req, res) => {
  // Request URL
  const url = req.query.url;

  // Get lat and long
  const lat = req.query.lat;
  const long = req.query.long;

  // Global Headers
  const headers = {
    'User-Agent': "Jacob's App (" + process.env.CLIENT_ID + ')'
  };

  var allBeers = [];

  // GET BEER LIST
  try {
    var beers = await axios.get(
      url +
        '?limit=50&client_id=' +
        process.env.CLIENT_ID +
        '&client_secret=' +
        process.env.CLIENT_SECRET
    );

    // Add Beers to Array
    beers.data.response.beers.items.forEach(beer => {
      allBeers.push(beer);
    });

    // Get number of beers
    var numBeers = beers.data.response.beers.count;

    while (numBeers === 50) {
      // Get more beers
      console.log(beers.data.response.pagination.next_url);
      beers = await axios.get(
        beers.data.response.pagination.next_url +
          '&limit=50&client_id=' +
          process.env.CLIENT_ID +
          '&client_secret=' +
          process.env.CLIENT_SECRET
      );

      beers.data.response.beers.items.forEach(beer => {
        allBeers.push(beer);
      });

      numBeers = beers.data.response.beers.count;
    }

    // FIND FAVORITE STYLES
    var beerStyles = [];
    for (var j = 0; j < allBeers.length; j++) {
      // check if style has been added to array already
      var found = false;
      for (var i = 0; i < beerStyles.length; i++) {
        if (beerStyles[i].style === allBeers[j].beer.beer_style) {
          beerStyles[i].value++;
          found = true;
          break;
        }
      }

      // create if not found
      if (!found) {
        let obj = { style: allBeers[j].beer.beer_style, value: 1 };
        beerStyles.push(obj);
      }
    }

    // SORT FAVORITE STYLES
    beerStyles.sort((a, b) => (a.value < b.value ? 1 : -1));

    // GET TOP 3 BEER STYLES
    var favoriteStyles = [];
    if (
      Object.entries(beerStyles).length === 0 &&
      beerStyles.constructor === Object
    ) {
      return res.send('NO_CHECKINS');
    } else {
      if (beerStyles[0].value < 5) {
        return res.send('INSUFFICIENT_CHECKINS');
      } else {
        for (var k = 0; k < beerStyles.length; k++) {
          if (k === 3) break;
          if (beerStyles[k].value > 4) favoriteStyles.push(beerStyles[k]);
        }
      }
    }

    // GET LOCAL CHECKINS
    var checkins = await axios.get(
      `https://api.untappd.com/v4/thepub/local?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&lat=${lat}&lng=${long}&radius=25`
    );

    // GET PREFERRED CHECKINS
    checkins.data.response.checkins.items.forEach(item => {
      console.log(item.beer.beer_style);
    });
    // Send data
    return res.send(checkins.data);
  } catch (err) {
    console.log(err);
    return res.send('ERROR');
  }
});

// Production Mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', (req, res) => {
    res.sendfile(path.join((__dirname = 'client/build/index.html')));
  });
}

// Build mode
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

// Listen
const port = process.env.PORT || 3001;
app.listen(port);
