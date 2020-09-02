const { Router } = require("express");

const {
  findGardenById,
  updateGardenInfo,
  removeGarden,
} = require("../../database/helpers/garden");

const { createPlant } = require("../../database/helpers/plant");

const { addPlantToGarden } = require("../../database/helpers/plantInGarden");

const gardenInfo = Router();
/**
 * This route accepts a garden id from the client and sends the info for that garden from the DB
 * @param {object} req.query the garden id value is stored at the 'id' key in req.query
 * @returns {object} this is the garden obj from the DB
 */
gardenInfo.get("/one", (req, res) => {
  const { id } = req.query;
  findGardenById(id).then((garden) => {
    console.log(garden);
    res.send(garden);
  });
});

/**
 * This function finds or creates a plant, then adds it to the garden with default 'garden layout' x and y coordinates
 * @param {object} req.body.plant
 * @param {number} req.body.gardenId
 * @returns no return yet specified
 */

gardenInfo.post("/addplant", (req, res) => {
  const { plant, gardenId } = req.body;
  createPlant(plant).then((data) => {
    const plantId = data.dataValues.id;
    addPlantToGarden(
      gardenId,
      {
        position_x: 1,
        position_y: 1,
        radius: 1,
      },
      plantId
    )
      .then(() => {
        res.send("plant created");
      })
      .catch((err) => console.log(err));
  });
});

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
      res.status(200);
      res.send(garden);
    })
    .catch((err) => console.log(err));
});

gardenInfo.delete("/deletegarden", (req, res) => {
  const { id } = req.body;
  removeGarden(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => console.log(err));
});

module.exports = {
  gardenInfo,
};
