const request = require("request");

const forecast = (latitude, longitude, callback) => {
  url =
    "https://api.darksky.net/forecast/b0ca4f8284a0a68d3878d28a474b7378/" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service.", undefined);
    } else if (body.error) {
      callback(
        "Unable to find that location. Try a different search.",
        undefined
      );
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out.  There is a ${body.currently.precipProbability} % chance of rain.`
      );
    }
  });
};

module.exports = forecast;
