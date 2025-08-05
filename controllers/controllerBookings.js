const Booking = require("../model/modelBookings");
const { noRoutes } = require("../config/util");

const getBookings = async (req, res) => {
  // check if there's data sended
  if (req.body)
    return res
      .status(401)
      .json({ message: "Something went wrong, no input needed!" });

  // proceed with request
  const result = await Booking.find();
  result
    ? res.json({
        message: "Booking request Success😎",
        data: result,
        length: result.length,
      })
    : res.json({
        message: "Sorry, no data inside available",
        data: result,
        length: result.length,
      });
};

const getBookingById = async (req, res) => {
  // check if there's data sended
  if (req.body)
    return res
      .status(401)
      .json({ message: "Something went wrong, no input needed!" });

  const { id } = req.params;

  // check if id provide 24 hexadecimal character
  if (id.length !== 24)
    return res.status(400).json({
      message: "Invalid ID, provide 24 hexadecimal character!",
    });

  // proceed with transmition data
  const result = await Booking.findById(id);
  result
    ? res.json({
        message: "Booking request Success📣",
        data: await result.populate(["eventId", "userId"]),
      })
    : res
        .status(404)
        .json({ message: "Sorry, no data inside available", data: result });
};

module.exports = { noRoutes, getBookings, getBookingById };
