const mongoose = require("../config/db");

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quota: {
    type: Number,
    default: 10,
  },
});

eventSchema.pre("save", function () {
  const year = this.date.getFullYear();
  const month = this.date.getMonth();
  const date = this.date.getDate();
  this.date = new Date(year, month, date + 1);

  // console.log(this);
});

// eventSchema.pre("insertOne", function () {
//   console.log(this);
// });

const Event = mongoose.model("Event", eventSchema);

// Event.insertOne({
//   title: "Workshop The futuristic Ai",
//   location: "Town Hall Squire",
//   price: "12000",
// });

module.exports = Event;
