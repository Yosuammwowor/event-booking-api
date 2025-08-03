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
    ? res.json({
        message: "Events request Success🙌",
        data: result,
        length: result.length,
      })
    : res.status(404).json({
        message: "Sorry, no data inside available",
        data: result,
        length: result.length,
      });
};

const getEventById = async (req, res) => {
  // check if there are input sended
  if (req.body) {
    return res
      .status(401)
      .json({ message: "Something went wrong, no input needed!" });
  }

  const { id } = req.params;

  if (id.length !== 24)
    return res.status(404).json({
      message: "Invalied ID, provide 24 hexadecimal character!",
    });

  const result = await Event.findById(id);
  result
    ? res.json({
        message: "Events request Success🙌",
        data: result,
      })
    : res.status(404).json({
        message: "Sorry, no data inside available",
        data: result,
      });
};

const addEvents = async (req, res) => {
  // check input sended {} or empty payloads
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(401).json({
      message: "Something went wrong, please check your input sended!",
    });
  }

  const { title, date, location, price, quota } = req.body;
  // check if there's no data sended
  if (!title || !date | !location || !price || !quota)
    return res
      .status(400)
      .json({ message: "Please provide every necessary input needed!" });

  // check values type data
  if (
    !isValidString(title) ||
    !isValidString(date) ||
    !isValidString(location) ||
    !isValidNumber(price) ||
    !isValidNumber(quota)
  )
    return res.status(400).json({
      message: "Something went wrong, please check your input data type!",
    });

  const newEvent = new Event({
    title: title,
    date: date,
    location: location,
    price: price,
    quota: quota,
  });

  const result = await newEvent.save();
  res.status(201).json({
    message: "User created successfully😆",
    data: result,
  });
};

const deleteEventById = async (req, res) => {
  // check if there's data sended
  if (req.body)
    return res
      .status(401)
      .json({ message: "Something went wrong, no input needed!" });

  // get id sended
  const { id } = req.params;

  // check if id isnt a 24 hexadecimal character
  if (id.length !== 24)
    return res
      .status(404)
      .json({ message: "Invalud ID, provide 24 hexadecimal character!" });

  // proceed with delete data by id
  const result = await Event.findByIdAndDelete(id);
  result
    ? res.json({
        message: "Data deleted Success👌",
        data: result,
      })
    : res.status(404).json({
        message: "Sorry, no data inside available",
        data: result,
      });
};

module.exports = {
  noRoutes,
  getEvents,
  getEventById,
  addEvents,
  deleteEventById,
};
