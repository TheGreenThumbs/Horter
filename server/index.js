require("dotenv").config();
// const { sequelize } = require("../database");
// const fillDatabaseWithDummyData = require("../testData");
const logger = require("../winston");

const { app } = require("./app");

const PORT = process.env.PORT || 8080;

// If mode is development drop database when the app starts
// This is for testing
// const eraseDatabaseOnSync = process.env.NODE_ENV === "development";

app.listen(PORT, () => logger.info("server RUninning"));
// Sync the Database and drop all the tables if RESET_DB is true
// sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
//   // If we reset the db fill it with dummy data
//   if (eraseDatabaseOnSync) {
//     fillDatabaseWithDummyData();
//   }

//   app
//     .listen(PORT, () => {
//       logger.info("Server running at: http://localhost:%s", PORT);
//     })
//     .catch((err) => {
//       logger.error(err);
//     });
// });
