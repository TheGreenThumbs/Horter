const { DataTypes } = require("sequelize");

const friendFactory = (sequelize) => {
  return sequelize.define("friend", {
    id_user: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
    id_friend: {
      type: DataTypes.INTEGER,
      allownull: false,
    },
  });
};

module.exports = friendFactory;
