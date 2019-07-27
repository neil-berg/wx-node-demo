const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/${
    process.env.DARK_SKY_API_KEY
  }/${latitude},${longitude}`;
  console.log(url);
  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to services', undefined);
    } else if (body.error) {
      callback('No Results found');
    } else {
      callback(undefined, {
        summary: body.daily.summary
      });
    }
  });
};

module.exports = {
  forecast
};
