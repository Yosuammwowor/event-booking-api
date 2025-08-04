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

module.exports = { noRoutes, getBookings };
