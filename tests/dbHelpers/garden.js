const chai = require("chai");
const { gardenHelpers } = require("../../database/helpers");
const { sequelize } = require("../../database");
const fillDatabaseWithDummyData = require("../../testData");

const { expect } = chai;

describe("Garden Database Helpers", function () {
  before("Reset the DB", function (done) {
    sequelize.sync({ force: true }).then(() => {
      fillDatabaseWithDummyData().then(() => done());
    });
  });

  context("Getting a Garden", function () {
    it("should return a garden by id", function () {
      gardenHelpers.findGardenById(1).then((response) => {
        expect(response).to.be("array");
      });
    });
  });
});
