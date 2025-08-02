const Event = require("../model/modelEvents");
const { isValidString, noRoutes } = require("../config/util");

const getEvents = async (req, res) => {
  // check if there are input sended
  if (req.body) {
    return res
      .status(401)
      .json({ message: "Something went wrong, no input needed!" });
  }
  const result = await Event.find();
  result.length !== 0
    ? res.json({ message: "Events request Success🙌", data: result })
    : res
        .status(404)
        .json({ message: "Sorry, no data inside available", data: result });
};

const addEvents = (req, res) => {};

module.exports = { noRoutes, getEvents };
