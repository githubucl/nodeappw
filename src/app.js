const express = require("express");
const path = require("path");
const { foreCast, geoCode } = require("./utils/geocode");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({ error: "You must provide an address" });
    return;
  }
  geoCode(req.query.address, (err, response) => {
    if (err) {
      return res.send({ error: err });
    }
    console.log(response.latitude);
    foreCast(response.latitude, response.longitude, (error, data) => {
      if (error) {
        return res.send({ error: err });
      }
      console.log("data", data);
      res.send({
        forecast: data.data.weather_descriptions,
        temperature: data.data.temperature,

        address: req.query.address,
      });
    });
  });
});

app.listen(port, () => {
  console.log("servier is up on port 3000");
});
