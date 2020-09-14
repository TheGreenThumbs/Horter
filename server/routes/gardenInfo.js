const { Router } = require("express");
const logger = require("../../winston");
const upload = require("./photos");
const {
  findGardenById,
  updateGardenInfo,
  removeGarden,
} = require("../../database/helpers/garden");

const { plantHelpers, gardenHelpers } = require("../../database/helpers");
const searchSelf = require("../helpers/trefle-api");

const {
  addPlantToGarden,
  updatePlantInGarden,
  removePlantInGarden,
  getAllPlantsInGarden,
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
// Add a garden
gardenInfo.post("/", upload.single("photo"), (req, res) => {
  const { garden } = req.body;
  const gardenParse = JSON.parse(garden);
  gardenParse.photo = req.file.location;
  gardenHelpers
    .createGarden(gardenParse)
    .then((response) => {
      res.status(201).send(response);
    })
    .catch((err) => {
      logger.error("Failed Adding Garden: %o", err);
      res.status(500).send(err);
    });
});

// Get all gardens for a given userId
gardenInfo.get("/user", (req, res) => {
  const { id } = req.query;
  gardenHelpers
    .findGardensByUserId(id)
    .then((gardens) => {
      res.status(200).send(gardens);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send(err);
    });
});

// This function finds or creates a plant, then adds it to the garden with default 'garden layout' x and y coordinates
// Takes a gardenId, a plantId(which is a trefleid), and a slug potentially
gardenInfo.post("/addplant", (req, res) => {
  const { gardenId, plantId, slug } = req.body;
  const newPlantInfo = {
    position_x: 1,
    position_y: 1,
    radius: 2,
  };
  plantHelpers
    .findPlantByTrefleId(plantId)
    .then((id) => {
      addPlantToGarden(gardenId, newPlantInfo, id)
        .then((item) => {
          res.status(201).send(item);
        })
        .catch((err) => {
          logger.error(err);
          res.status(500).send(err);
        });
    })
    .catch(() => {
      searchSelf(slug)
        .then((plant) => {
          return plantHelpers.createPlantWithSelfData(plant);
        })
        .then((plant) => {
          return addPlantToGarden(gardenId, newPlantInfo, plant.id);
        })
        .then((item) => {
          res.status(201).send(item);
        })
        .catch((err) => {
          logger.error(err);
          res.status(500).send(err);
        });
    });
});

/**
 * Get all the plants a user has planted in their gardens by user Id
 */
gardenInfo.get("/plants", (req, res) => {
  const { userId } = req.query;
  getAllPlantsInGarden(userId)
    .then((plants) => {
      res.status(200).send(plants);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send(err);
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
  logger.info(id, info);
  updateGardenInfo(id, info)
    .then((garden) => {
      res.status(200);
      res.send(garden);
    })
    .catch((err) => logger.error(err));
});

/**
 * this route accepts a plantInGarden id from the req body and deletes that enrty in the plantInGarden table
 * @param {number} req.body.id
 */
gardenInfo.delete("/deleteplant", (req, res) => {
  const { id } = req.body;
  removePlantInGarden(id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch((err) => {
      logger.error(err);
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
    .catch((err) => logger.error(err));
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
      res.sendStatus(204);
    })
    .catch((err) => {
      logger.error(err);
      res.sendStatus(500);
    });
});

module.exports = {
  gardenInfo,
};
