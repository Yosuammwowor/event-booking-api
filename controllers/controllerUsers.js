const User = require("../model/modelUsers");

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json({ message: "Users Request Success😄", data: users });
};

const noRoutes = (req, res) => {
  res.json({ message: "No Route found" });
};

module.exports = { getUsers, noRoutes };
