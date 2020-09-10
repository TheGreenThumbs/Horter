const gardenFactory = require("./garden");
const plantInGardenFactory = require("./plantInGarden");
const wishListFactory = require("./wishlist");
const plantFactory = require("./plant");
const userFactory = require("./user-profile");
const friendFactory = require("./friend");
const sessionFactory = require("./session");

module.exports = {
  gardenFactory,
  plantFactory,
  plantInGardenFactory,
  userFactory,
  wishListFactory,
  friendFactory,
  sessionFactory,
};
