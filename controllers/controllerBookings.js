const Booking = require("../model/modelBookings");
const { noRoutes, isValidNumber, isValidString } = require("../config/util");

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

const addBookings = async (req, res) => {
  // check if data sended {} or empty payloads
  if (!req.body || Object.keys(req.body).length === 0)
    return res.status(401).json({
      message: "Something went wrong, please check your input sended!",
    });

  const { userId, eventId, totalTicket, bookedAt } = req.body;

  // check if empty values
  if (!userId || !eventId || !totalTicket || !bookedAt)
    return res.status(400).json({
      message: "Please provide every necessary input!",
    });

  // check userId and eventId values length AND data types
  if (
    (userId.length !== 24 && eventId.length !== 24) ||
    !isValidString(userId) ||
    !isValidString(eventId)
  )
    return res.status(400).json({
      message:
        "Invalid ID, please provide userId and eventId 24 hexadecimal character!",
    });

  // check data types
  if (!isValidNumber(totalTicket) || !isValidString(bookedAt))
    return res
      .status(400)
      .json({ message: "Something went wrong, check your values data type!" });

  // proceed making data object
  const newBooking = new Booking({
    userId: userId,
    eventId: eventId,
  });

  const detailBooking = await newBooking.populate(["userId", "eventId"]);

  // check userId relationship
  if (!detailBooking.userId)
    return res.status(400).json({ message: "No userId inside database!" });

  // check eventId relationship
  if (!detailBooking.eventId)
    return res.status(400).json({ message: "No eventId inside database!" });

  // check totalTicket over limit or not
  if (totalTicket > detailBooking.eventId.quota)
    return res.status(400).json({
      message: `Total ticket over the quota limit, remaining tickets: ${detailBooking.eventId.quota}`,
    });

  // proceed data transmition
  detailBooking.eventId.quota -= totalTicket;
  newBooking.totalPrice = detailBooking.eventId.price * totalTicket;
  newBooking.totalTicket = totalTicket;
  newBooking.bookedAt = bookedAt;

  await detailBooking.eventId.save();
  await newBooking.save();

  res.status(201).json({
    message: "Data successfully Added❤️",
    data: newBooking,
  });
};

module.exports = { noRoutes, getBookings, getBookingById, addBookings };
