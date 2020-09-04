const wishListFactory = (sequelize) => {
  return sequelize.define("wishlist");
};

module.exports = wishListFactory;
