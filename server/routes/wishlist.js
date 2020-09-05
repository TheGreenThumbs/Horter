const { Router } = require("express");

const logger = require("../../winston");
const {
  wishListHelpers,
  plantHelpers,
} = require("../../database/helpers/index");
const searchSelf = require("../helpers/trefle-api");

const wishListRouter = Router();

// Get a user's wishlist by userId
wishListRouter.get("/", (req, res) => {
  const { userId } = req.query;
  wishListHelpers
    .getUserWishList(userId)
    .then((wishList) => {
      res.status(200).send(wishList);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send(err);
    });
});

// Delete a wishlist item by wishlist id
wishListRouter.delete("/", (req, res) => {
  const { id } = req.query;
  wishListHelpers
    .deleteWishListItem(id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send(err);
    });
});

// Add a new wishlist item with userId and plantId(which is a trefleID) and potentially a slug
wishListRouter.post("/", (req, res) => {
  const { userId, plantId, slug } = req.body;
  plantHelpers
    .findPlantByTrefleId(plantId)
    .then((id) => {
      wishListHelpers
        .addToWishList(userId, id)
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
          return wishListHelpers.addToWishList(userId, plant.id);
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

module.exports = wishListRouter;
