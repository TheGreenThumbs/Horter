const { DataTypes } = require("sequelize");

/**
 * Factory function that creates a plant table for sequelize
 * @param {Sequelize} sequelize the database connection
 * @returns a garden table object
 */
const plantFactory = (sequelize) => {
  return sequelize.define("plant", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    id_trefle: {
      type: DataTypes.INTEGER,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    common_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scientific_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.STRING,
    },
    duration: {
      type: DataTypes.STRING,
    },
    edible: {
      type: DataTypes.BOOLEAN,
    },
    vegetable: {
      type: DataTypes.BOOLEAN,
    },
    light: {
      type: DataTypes.INTEGER,
    },
    ph_min: {
      type: DataTypes.REAL,
    },
    ph_max: {
      type: DataTypes.REAL,
    },
    temp_min: {
      type: DataTypes.INTEGER,
    },
    temp_max: {
      type: DataTypes.INTEGER,
    },
    precipitation_min: {
      type: DataTypes.INTEGER,
    },
    precipitation_max: {
      type: DataTypes.INTEGER,
    },
    soil_nutriments: {
      type: DataTypes.INTEGER,
    },
    soil_salinity: {
      type: DataTypes.INTEGER,
    },
    soil_texture: {
      type: DataTypes.INTEGER,
    },
    soil_humidity: {
      type: DataTypes.INTEGER,
    },
  });
};

module.exports = plantFactory;
