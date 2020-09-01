const { DataTypes } = require("sequelize");

/**
 * A factory function that defines a plant_in_garden table
 * @param {Sequelize} sequelize connection to the database
 */
const plantInGardenFactory = (sequelize) => {
  return sequelize.define("plant_in_garden", {
    position_x: {
      type: DataTypes.INTEGER,
    },
    position_y: {
      type: DataTypes.INTEGER,
    },
    radius: {
      type: DataTypes.INTEGER,
    },
  });
};

module.exports = plantInGardenFactory;
