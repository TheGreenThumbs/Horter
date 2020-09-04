const { DataTypes } = require("sequelize");
/**
 * Factory function that creates a garden table for sequelize
 * @param {Sequelize} sequelize the database connection
 * @returns a user table object
 */
const userFactory = (sequelize) => {
  return sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_google: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
    },
    s3_id: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.REAL,
      allowNull: false,
    },
    lng: {
      type: DataTypes.REAL,
      allowNull: false,
    },
  });
};

module.exports = userFactory;
