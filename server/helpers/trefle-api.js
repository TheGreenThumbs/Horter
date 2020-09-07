const axios = require("axios");

const logger = require("../../winston");

axios.defaults.headers.common.Authorization = process.env.TREFLE_TOKEN;

const searchSelf = (slug) =>
  new Promise((resolve, reject) => {
    axios
      .get(`https://trefle.io/api/v1/species/${slug}`)
      .then((plants) => {
        resolve(plants.data);
      })
      .catch((err) => {
        logger.error(err);
        reject(err);
      });
  });

module.exports = searchSelf;
