const { getUser_db } = require("../model/users");

const getUsers = (req, res) => {
  res.json({ message: "Controller works!" });
};

const noRoutes = (req, res) => {
  res.json({ message: "No Route found" });
};

module.exports = { getUsers, noRoutes };
