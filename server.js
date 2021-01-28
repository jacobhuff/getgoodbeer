// Configuration
require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const app = express();

// Helper Functions
const filterCheckins = (checkins, beerStyles, items, allBeers) => {
  checkins.data.response.checkins.items.forEach(item => {
    for (let i = 0; i < beerStyles.length; i++) {
      if (beerStyles[i].style === item.beer.beer_style) {
        // check if user has had beer
        var found = false;
        for (let j = 0; j < allBeers.length; j++) {
          if (item.beer.bid === allBeers[j].beer.bid) {
            found = true;
            break;
          }
        }

        // add beer if not already had
        if (!found) {
          let isDuplicate = false;
          for (let q = 0; q < items.length; q++) {
            if (items[q].beer.bid === item.beer.bid) {
              isDuplicate = true;
              break;
            }
          }
          if (!isDuplicate) items.push(item);
        }

        break;
      }
    }
  });
  return items;
};

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

  // GET BEER LIST
  try {
    // Get User Beers
    var allBeers = [];
    console.log('Before First Call');
    console.log(process.env.CLIENT_ID)
    var beers = await axios.get(
      url +
        `?limit=50&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
      { headers }
    );

    // Add User Beers to Array
    beers.data.response.beers.items.forEach(beer => {
      allBeers.push(beer);
    });

    // Get Number of User Beers
    var numBeers = beers.data.response.beers.count;

    // Get rest of user beers if more than 50
    while (numBeers === 50) {
      console.log('NumBeers: ' + numBeers);
      beers = await axios.get(
        beers.data.response.pagination.next_url +
          `&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`,
        {
          headers
        }
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
          favoriteStyles.push(beerStyles[k]);
        }
      }
    }

    // GET LAST 125 LOCAL CHECKINS
    var items = [];
    var checkins = await axios.get(
      `https://api.untappd.com/v4/thepub/local?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&lat=${lat}&lng=${long}&radius=25`,
      { headers }
    );
    items = filterCheckins(checkins, favoriteStyles, items, allBeers);
    var counter = 1;
    while (checkins.data.response.pagination.next_url !== null && counter < 5) {
      console.log('counter: ' + counter);
      checkins = await axios.get(
        checkins.data.response.pagination.next_url +
          `&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&radius=25`,
        { headers }
      );
      items = filterCheckins(checkins, favoriteStyles, items, allBeers);
      counter++;
    }

    // Send data
    return res.send(items);
  } catch (err) {
    if (typeof err.response === 'undefined') {
      return res.send('PROFILE_NOT_FOUND');
    } else if (err.response.status === 429)
      return res.send('RATE_LIMIT_REACHED');
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
