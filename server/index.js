require("dotenv").config();
const { sequelize } = require("../database");
const fillDatabaseWithDummyData = require("../testData");

const { app } = require("./app");

const PORT = process.env.PORT || 8080;

// If mode is development drop database when the app starts
const eraseDatabaseOnSync = process.env.NODE_ENV === "development";

sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  if (eraseDatabaseOnSync) {
    fillDatabaseWithDummyData();
  }

  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
  });
});
