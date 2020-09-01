const chai = require("chai");
const { gardenHelpers } = require("../../database/helpers");
const { sequelize } = require("../../database");
const fillDatabaseWithDummyData = require("../../testData");

const { expect } = chai;

describe("Garden Database Helpers", () => {
  before("Reset the DB", (done) => {
    sequelize.sync({ force: true }).then(() => {
      fillDatabaseWithDummyData().then(() => done());
    });
  });

  context("Getting a Garden", () => {
    it("should return a garden by id", (done) => {
      gardenHelpers.findGardenById(1).then((response) => {
        expect(response).to.be.an("object");
        expect(response).to.have.property("name");
        done();
      });
    });
    it("should not find a garden that doesn't exist", (done) => {
      gardenHelpers.findGardenById(-100).catch((err) => {
        expect(err).to.exist;
        done();
      });
    });
  });

  context("Adding a Garden", () => {
    it("should add a garden", (done) => {
      const newGarden = {
        name: "new",
        width: 1,
        length: 1,
        lat: 23.3422,
        lng: -23.3523,
        photo: "url",
        zone: 3,
      };
      gardenHelpers.createGarden(newGarden).then((response) => {
        expect(response).to.be.an("object");
        Object.keys(newGarden).forEach((key) => {
          expect(response[key]).to.equal(newGarden[key]);
        });
        done();
      });
    });
    it("should not add a garden without all the info", (done) => {
      gardenHelpers.createGarden({ name: "hello" }).catch((err) => {
        expect(err).to.exist;
        done();
      });
    });
  });
});
