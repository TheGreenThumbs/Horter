const { DataTypes } = require("sequelize");
/**
 * Factory function that creates a garden table for sequelize
 * @param {Sequelize} sequelize the database connection
 * @returns a garden table object
 */
const gardenFactory = (sequelize) => {
  return sequelize.define("garden", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
    },
    zone: {
      type: DataTypes.INTEGER,
    },
  });
};

module.exports = gardenFactory;
