const { Router } = require("express");
// const axios = require('axios');
require("dotenv").config();

const stores = Router();

const data = require("../../testData/placesApiResults.json");
// const { GOOGLE_API_KEY } = process.env;

stores.get("/", (req, res) => {
  const { lat, lng } = req.query;
  console.log(lat, lng);
  // const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
  //       lat
  //     },${lng}&type=hardware_store&radius=10000&key=${GOOGLE_API_KEY}`;
  // axios.get(URL)
  // .then((response) => {
  //   res.send(response.data.results);
  // })
  // .catch(() => {
  //   res.send(500);
  // })
  res.send(data);
});

module.exports = {
  stores,
};
