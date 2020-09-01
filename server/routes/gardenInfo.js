const { Router } = require("express");

const {
  findGardenById,
  updateGardenInfo,
} = require("../../database/helpers/garden");

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
// waiting until PLANT table is complete

// gardenInfo.post("/addplant", (req, res) => {

// });

/**
 * This route handles requests to update user information for a garden
 * @param {object} req.body the body will contain a garden id and an object of properties on the garden to update and the values
 *                          they will be updated to
 * @returns
 */
gardenInfo.put("/userupdate", (req, res) => {
  const { id, info } = req.body;
  updateGardenInfo(id, info)
    .then((garden) => {
      console.log(garden);
      res.status(200);
      res.send(garden);
    })
    .catch((err) => console.log(err));
});

// DELETE/gardId/ remove garden
gardenInfo.delete("/deletegarden", (req, res) => {
  // const { id } = req.body
  console.log(req.body);
  res.sendStatus(204);
});

module.exports = {
  gardenInfo,
};
