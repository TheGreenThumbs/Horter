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

  // context("Updating a Garden", () => {
  //   it("should update a garden", (done) => {
  //     gardenHelpers.findGardenById(1).then((gardenInfo) => {
  //       const updatedGarden = { width: 1, length: 1 };
  //       gardenHelpers.updateGardenInfo(1, updatedGarden).then((response) => {
  //         expect(response).to.be.an("object");
  //         Object.keys(updatedGarden).forEach((key) => {
  //           expect(response[key]).to.equal(updatedGarden[key]);
  //         });
  //         expect(response.name).to.equal(gardenInfo.name);
  //         done();
  //       });
  //     });
  //   });

  //   it("should not update a garden with a bad id", (done) => {
  //     gardenHelpers.updateGardenInfo(-100, { name: "hello" }).catch((err) => {
  //       expect(err).to.exist;
  //       done();
  //     });
  //   });
  // });

  // context("Deleting a Garden", () => {
  //   it("should delete a garden", (done) => {
  //     gardenHelpers.removeGarden(1).then((response) => {
  //       expect(response).to.be.an("object");
  //       expect(response.deleted).to.be.true;
  //       done();
  //     });
  //   });

  //   it("should not delete a garden with a bad id", (done) => {
  //     gardenHelpers.removeGarden(-100).catch((err) => {
  //       expect(err).to.exist;
  //       done();
  //     });
  //   });
  // });
});
