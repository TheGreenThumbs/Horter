const { Router } = require("express");

const logger = require("../../winston");
const { wishListHelpers } = require("../../database/helpers/index");

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

// Add a new wishlist item with userId and plantId
wishListRouter.post("/", (req, res) => {
  const { userId, plantId } = req.body;
  wishListHelpers
    .addToWishList(userId, plantId)
    .then((item) => {
      res.status(201).send(item);
    })
    .catch((err) => {
      logger.error(err);
      res.status(500).send(err);
    });
});

module.exports = wishListRouter;
