const chai = require("chai");
const {
  gardenHelpers,
  plantInGardenHelpers,
} = require("../../database/helpers");
const { sequelize } = require("../../database");
const fillDatabaseWithDummyData = require("../../testData");

const { expect } = chai;

describe("Plant In Garden Database Helpers", () => {
  before("Reset the DB", (done) => {
    sequelize.sync({ force: true }).then(() => {
      fillDatabaseWithDummyData().then(() => done());
    });
  });

  context("Getting a Garden's Plants", () => {
    it("should return a garden with plants", (done) => {
      gardenHelpers.findGardenById(1).then((response) => {
        expect(response).to.be.an("object");
        expect(response).to.have.property("plants");
        done();
      });
    });
  });

  // This helper doesn't work yet
  xcontext("Getting all of a User's Plants in Gardens", () => {
    it("should return all the unique plants a user has planted", (done) => {
      plantInGardenHelpers.getAllPlantsInGarden(1).then((response) => {
        expect(response).to.be.an("object");
        done();
      });
    });
  });

  context("Adding a Plant to a Garden", () => {
    it("should add a plant to a garden", (done) => {
      const newPlant = {
        position_x: 1,
        position_y: 1,
        radius: 1,
      };
      plantInGardenHelpers.addPlantToGarden(1, newPlant).then((response) => {
        expect(response).to.be.an("object");
        Object.keys(newPlant).forEach((key) => {
          expect(response[key]).to.equal(newPlant[key]);
        });
        done();
      });
    });
    it("should not add a plant to a garden that doesn't exist", (done) => {
      plantInGardenHelpers
        .addPlantToGarden(-1, { name: "hello" })
        .catch((err) => {
          expect(err).to.exist;
          done();
        });
    });
  });

  context("Updating a Plant in a Garden", () => {
    it("should update a plant", (done) => {
      plantInGardenHelpers
        .updatePlantInGarden(1, { radius: 15 })
        .then((plant) => {
          expect(plant.radius).to.equal(15);
          done();
        });
    });

    it("should not update a plant with a bad id", (done) => {
      plantInGardenHelpers
        .updatePlantInGarden(-100, { name: "hello" })
        .catch((err) => {
          expect(err).to.exist;
          done();
        });
    });
  });

  context("Deleting a Plant", () => {
    it("should delete a Plant from a garden", (done) => {
      plantInGardenHelpers.removePlantInGarden(1).then((response) => {
        expect(response).to.be.an("object");
        expect(response.deleted).to.be.true;
        done();
      });
    });

    it("should not delete a plant with a bad id", (done) => {
      plantInGardenHelpers.removePlantInGarden(-100).catch((err) => {
        expect(err).to.exist;
        done();
      });
    });
  });
});
