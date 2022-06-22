const request = require("request");

const geoCode = (address, callback) => {
  const url2 = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiY2hlbjE1MTAiLCJhIjoiY2w0Y2FnZzF1MDAxMjNkcGFmZXhjNzB2MyJ9.idCAAnc5dLzzirXFtwPYpQ&limit=1`;
  request({ url: url2, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to location", undefined);
      return;
    }

    if (response.body.features.length === 0) {
      callback("cant find it g", undefined);
      return;
    }
    callback(undefined, {
      latitude: response.body.features[0].center[0],
      longitude: response.body.features[0].center[1],
      location: response.body.features[0].place_name,
    });
  });
};

const foreCast = (lat, long, callback) => {
  const url1 = `http://api.weatherstack.com/current?access_key=592f53903742d10f1a80bbad843c4e0d&query=${long},${lat}`;
  request({ url: url1, json: true }, (error, response) => {
    if (error) {
      callback("internet problem bro", undefined);
      return;
    }
    if (response.body.error) {
      callback("cant find it g", undefined);
      return;
    }
    callback(undefined, {
      data: response.body.current,
    });
  });
};

module.exports = { geoCode, foreCast };
