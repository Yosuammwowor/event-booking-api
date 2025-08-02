const User = require("../model/modelUsers");
const { isValidString, noRoutes } = require("../config/util");

const getUsers = async (req, res) => {
  // This error handler use for empty payloads or {}
  if (req.body) {
    return res
      .status(401)
      .json({ message: "Something went wrong, no input needed!" });
  }

  const users = await User.find();
  res.json({ message: "Users Request Success😄", data: users });
};

const addUsers = async (req, res) => {
  // check if body sended empty
  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ message: "Something went wrong, there are no input sended!" });
  }

  const { name, email, password } = req.body;

  // check values data type
  if (
    !isValidString(name) ||
    !isValidString(email) ||
    !isValidString(password)
  ) {
    return res
      .status(400)
      .json({ message: "Something went wrong, check your values data type!" });
  }

  const newUser = new User({
    name: name,
    email: email,
    password: password,
  });

  const result = await newUser.save();
  res
    .status(201)
    .json({ message: "User created successfully😆", data: result });
};

module.exports = { getUsers, addUsers, noRoutes };
