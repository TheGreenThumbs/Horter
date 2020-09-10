// const { DataTypes } = require("sequelize");
/**
 * Factory function that creates a session table for sequelize
 * @param {Sequelize} sequelize the database connection
 * @returns a session table object
 */
const sessionFactory = async (sequelize) => {
  if (process.env.RESET_DB === "true") {
    return sequelize.query(`DROP TABLE "session";
    CREATE TABLE "session" (
      "sid" varchar NOT NULL COLLATE "default",
      "sess" json NOT NULL,
      "expire" timestamp(6) NOT NULL
    )
    WITH (OIDS=FALSE);
    
    ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
    
    CREATE INDEX "IDX_session_expire" ON "session" ("expire");
    
    `);
  }
  return sequelize
    .query(
      `CREATE TABLE "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
  )
  WITH (OIDS=FALSE);
  
  ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
  
  CREATE INDEX "IDX_session_expire" ON "session" ("expire");
  `
    )
    .then(() => {})
    .catch(() => {});
};

module.exports = sessionFactory;
