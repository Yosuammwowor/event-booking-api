const mongoose = require("../config/db");
require("./modelEvents");
require("./modelUsers");

const bookingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventId: {
    type: mongoose.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  totalTicket: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  bookedAt: {
    type: Date,
    default: Date.now(),
  },
});

bookingSchema.pre("save", function () {
  const year = this.bookedAt.getFullYear();
  const month = this.bookedAt.getMonth();
  const date = this.bookedAt.getDate();
  this.bookedAt = new Date(year, month, date + 1);
});

const Booking = mongoose.model("Booking", bookingSchema);

// const makeBooking = async (userId, eventId) => {
//   const newBooking = new Booking({
//     userId: userId,
//     eventId: eventId,
//     totalTicket: 10,
//     totalPrice: 10,
//     bookedAt: "2025",
//   });

//   await newBooking.save();
//   console.log(newBooking);
// };

// makeBooking("688caaa68a0dee0c2ff14689", "688e25db08b3088ae044dfa8");

// const populateBooking = async () => {
//   const book = await Booking.find().populate(["userId", "eventId"]);
//   console.log(book);
// };

// populateBooking();

module.exports = Booking;
