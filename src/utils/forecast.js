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
        `${body.currently.summary} today.  Wind speeds of ${
          body.daily.data[0].windSpeed
        } m.p.h. with gusts up to ${
          body.daily.data[0].windGust
        } m.p.h. Currently ${body.currently.temperature} degrees. ${
          body.currently.precipProbability
        }% chance of precipitation today. High today of ${
          body.daily.data[0].temperatureHigh
        } degrees and low of ${
          body.daily.data[0].temperatureLow
        } degrees.  Humidity is ${body.daily.data[0].humidity * 100}%. ${
          body.daily.summary
        }`
      );
    }
  });
};

module.exports = forecast;
