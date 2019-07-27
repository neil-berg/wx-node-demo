const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/369c0b7535ce1f5ca60a8de604ceed61/${latitude},${longitude}`;
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
