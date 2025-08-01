const express = require("express");
const route = express.Router();

const { getUsers, noRoutes } = require("../controllers/controllerUsers");

route.get("/", (req, res) => {
  getUsers(req, res);
});

route.all("/*any", (req, res) => {
  noRoutes(req, res);
});

module.exports = route;
