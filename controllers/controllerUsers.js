const User = require("../model/modelUsers");

const getUsers = async (req, res) => {
  // This error handler use for empty payloads or {}
  if (req.body) {
    return res.json({ message: "Something went wrong, no input needed!" });
  }

  const users = await User.find();
  res.json({ message: "Users Request Success😄", data: users });
};

const noRoutes = (req, res) => {
  res.json({ message: "No Route found" });
};

module.exports = { getUsers, noRoutes };
