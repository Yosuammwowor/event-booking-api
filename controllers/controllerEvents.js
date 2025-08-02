const Event = require("../model/modelEvents");
const { noRoutes, isValidString, isValidNumber } = require("../config/util");

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

const addEvents = async (req, res) => {
  // check input sended {} or empty payloads
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(401).json({
      message: "Something went wrong, please check your input sended!",
    });
  }

  const { title, date, location, price, quota } = req.body;
  // check values type data
  if (
    !isValidString(title) ||
    !isValidString(date) ||
    !isValidString(location) ||
    !isValidNumber(price) ||
    !isValidNumber(quota)
  ) {
    return res.status(400).json({
      message: "Something went wrong, please check your input data type!",
    });
  }

  const newEvent = new Event({
    title: title,
    date: date,
    location: location,
    price: price,
    quota: quota,
  });

  const result = await newEvent.save();
  res
    .status(201)
    .json({ message: "User created successfully😆", data: result });
};

module.exports = { noRoutes, getEvents, addEvents };
