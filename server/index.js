require("dotenv").config();
const { sequelize } = require("../database");
const fillDatabaseWithDummyData = require("../testData");

const { app } = require("./app");

const PORT = process.env.PORT || 8080;

// If mode is development drop database when the app starts
const eraseDatabaseOnSync = process.env.RESET_DB === "true";

// Sync the Database and drop all the tables if RESET_DB is true
sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  // If we reset the db fill it with dummy data
  if (eraseDatabaseOnSync) {
    fillDatabaseWithDummyData();
  }

  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
  });
});
