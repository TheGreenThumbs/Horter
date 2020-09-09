const { Router } = require("express");
const axios = require("axios");
require("dotenv").config();
const logger = require("../../winston");

const stores = Router();

// const results = require("../../testData/placesApiResults.json");

// let singleStore = require("../../testData/placesApiSingle.json");

const { GOOGLE_API_KEY } = process.env;

stores.get("/", (req, res) => {
  const { lat, lng } = req.query;
  logger.info(req.query);
  const URL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&type=hardware_store&radius=10000&key=${GOOGLE_API_KEY}`;
  axios
    .get(URL)
    .then((response) => {
      res.send(
        response.data.results.map((a) => {
          return {
            position: a.geometry.location,
            name: a.name,
            placeId: a.place_id,
            icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
          };
        })
      );
    })
    .catch(() => {
      res.send(500);
    });
  // res.send(
  //   results.map((a) => {
  //     return {
  //       position: a.geometry.location,
  //       name: a.name,
  //       placeId: a.place_id,
  //     };
  //   })
  // );
});

stores.get("/one", (req, res) => {
  const { placeId } = req.query;
  const URL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`;
  axios
    .get(URL)
    .then((response) => {
      const singleStore = response.data.result;
      const store = {
        address: singleStore.formatted_address,
        phone: singleStore.formatted_phone_number,
        name: singleStore.name,
        schedule: singleStore.opening_hours.weekday_text,
        rating: singleStore.rating,
      };

      res.send(store);
    })
    .catch(() => {
      res.send(500);
    });

  // singleStore = singleStore.result;
  // const store = {
  //   address: singleStore.formatted_address,
  //   phone: singleStore.formatted_phone_number,
  //   name: singleStore.name,
  //   schedule: singleStore.opening_hours.weekday_text,
  //   rating: singleStore.rating,
  // }
  // res.send(store);
});

module.exports = {
  stores,
};
