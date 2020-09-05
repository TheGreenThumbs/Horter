const { Router } = require("express");
const logger = require("../../winston");

const {
  findGardenById,
  updateGardenInfo,
  removeGarden,
} = require("../../database/helpers/garden");

const { createPlant } = require("../../database/helpers/plant");

const {
  addPlantToGarden,
  updatePlantInGarden,
  removePlantInGarden,
} = require("../../database/helpers/plantInGarden");

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
gardenInfo.put("/gardenupdate", (req, res) => {
  const { id, info } = req.body;
  const updatedInfo = {};
  // for(const key in info){
  //   if(info[key]){
  //     updatedInfo[key] = info[key];
  //   }
  // }
  logger.info(updatedInfo, info);
  updateGardenInfo(id, updatedInfo)
    .then((garden) => {
      res.status(200);
      res.send(garden);
    })
    .catch((err) => console.log(err));
});

/**
 * this route accepts a plantInGarden id from the req body and deletes that enrty in the plantInGarden table
 * @param {number} req.body.id
 */
gardenInfo.delete("/deleteplant", (req, res) => {
  const { id } = req.body;
  removePlantInGarden(id)
    .then(() => {
      console.log("removed!");
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * This route accepts an id of a garden to delete, then deletes the garden
 * @param {number} req.body.id
 */
gardenInfo.delete("/deletegarden", (req, res) => {
  const { id } = req.body;
  removeGarden(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => console.log(err));
});

/**
 * This route updates data about the plant in the garden, namely its coordinates or radius
 * @param {number} id of the plant_in_garden to be updated
 * @param {object} info the specific items to be updated in the DB entry
 */

gardenInfo.put("/locationdata", (req, res) => {
  const { id, info } = req.body;
  updatePlantInGarden(id, info)
    .then(() => {
      console.log("updated plant in garden");
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = {
  gardenInfo,
};
