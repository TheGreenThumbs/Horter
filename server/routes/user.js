const { Router } = require("express");

const {
    createUser,
    findUserByUsername,
    updateUser,
    removeUser
  } = require("../../database/helpers/user-profile");
  
  const userInfo = Router();
  /**
   * This route accepts a user's username from the client and sends the info for that user from the DB
   * @param {object} req.query the username value is stored at the 'username' key in req.query
   * @returns {object} this is the user obj from the DB
   */
  userInfo.get("/getuser", (req, res) => {
    const { username } = req.query;
    findUserByUsername(username).then((user) => {
      res.send(user);
    });
  });
  

  
  userInfo.post("/adduser", (req, res) => {
      const { body } = req;
    createUser(body).then((newUser) => {
        res.status(201);
        res.send(newUser);
    })
    .catch((err) => console.log(err));
  });
  
  /**
   * This route handles requests to update user information for a user
   * @param {object} req.body the body will contain a user id and an object of properties on the user to update and the values
   *                          they will be updated to
   * @returns
   */
  userInfo.put("/userupdate", (req, res) => {
    const { id, info } = req.body;
    updateUser(id, info)
      .then((user) => {
        res.status(200);
        res.send(user);
      })
      .catch((err) => console.log(err));
  });
  
  // DELETE/userId/ remove user
  userInfo.delete("/deleteuser", (req, res) => {
    const { id } = req.body;
    removeUser(id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => console.log(err));
  });
  
  module.exports = {
    userInfo,
  };