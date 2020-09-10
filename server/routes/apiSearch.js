const axios = require("axios");

require("dotenv").config();

const { Router } = require("express");

const apiSearch = Router();
const { TREFLE_TOKEN } = process.env;
axios.defaults.headers.common.Authorization = TREFLE_TOKEN;
/*
 GET/region accepts a region to search plants for by. returns list
*/

/**
 * The home route for apiSearch accepts user search input in the form of a string. It then searches for plants based
 * on this input, finally sending an array of plant objects to the user
 * @param {object} req.query - contains a key/value pair where the value is the plant to be searched
 * @returns {array} an array of plant objects
 */
apiSearch.get("/", (req, res) => {
  const search = req.query.q;
  axios
    .get(`https://trefle.io/api/v1/plants/search?&q=${search}`)
    .then((plants) => {
      res.send(plants.data.data);
    })
    .catch((err) => {
      console.error(err);
    });
});

/**
 * This route accepts a specific plant scientific name, "slug" specifically as it is called on
 *    the plant data object from trefle.io. It then returns in-depth data about that single
 *    species
 * @param {object} req.query - contains a key/value pair where the value is the "slug" from the
 *      above query's plant data object
 * @returns {object} An object with a key "data" which contains a large object of the data
 */

apiSearch.get("/self", (req, res) => {
  const search = req.query.q;
  axios
    .get(`https://trefle.io/api/v1/species/${search}`)
    .then((plants) => {
      res.send(plants.data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * This endpoint will bring up plants native to a region. The regions in USA are:
 * 74- "North-Central U.S.A.", 75- "Northeastern U.S.A.",
 * 76- "Southwestern U.S.A.", 77- "South-Central U.S.A.",
 * 78- "Southeastern U.S.A.". Any of these bring up close to 1600 pages of results
 * @param {object} req.query - gives a key/value where value is the region number
 * @returns {object} an object which contains a data key which contains an array of plant objects
 */
apiSearch.get("/distribution", (req, res) => {
  const { region } = req.query;
  axios
    .get(`https://trefle.io/api/v1/distributions/${region}/plants`)
    .then((plants) => {
      res.send(plants.data);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = {
  apiSearch,
};
