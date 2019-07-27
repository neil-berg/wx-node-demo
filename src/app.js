const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Neil Berg'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Neil Berg'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'We are here to help you',
    name: 'Neil Berg'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Must provide address'
    });
  }

  // Translate address to coordinates
  geocode.geocode(
    req.query.address,
    (error, { location, latitude, longitude } = {}) => {
      if (error) {
        return res.send({ error });
      }

      // With coordinates in hand, find forecast
      forecast.forecast(latitude, longitude, (error, { summary }) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          address: req.query.address,
          location,
          summary
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    });
  }
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Neil Berg',
    notFoundText: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Neil Berg',
    notFoundText: 'Page not found'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
