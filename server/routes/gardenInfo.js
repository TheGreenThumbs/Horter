const { Router } = require("express");

const { findGardenById } = require("../../database/helpers/garden");

const gardenInfo = Router();
/**
 * This route accepts a garden id from the client and sends the info for that garden from the DB
 * @param {object} req.query the garden id value is stored at the 'id' key in req.query
 * @returns {object} this is the garden obj from the DB
 */
gardenInfo.get("/one", (req, res) => {
  const { id } = req.query;
  findGardenById(id).then((garden) => {
    res.send(garden);
  });
});

//  POST/gardId/plantId add a plant to garden
// gardenInfo.post("/add", (req, res) => {

// });

module.exports = {
  gardenInfo,
};
