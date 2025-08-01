const mongoose = require("../config/db");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// userSchema.pre("save", async function () {
//   this.password = await bcrypt
//     .genSalt(10)
//     .then((salt) => {
//       return bcrypt.hash(this.password, salt);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   console.log(this.password);
// });

userSchema.pre("insertOne", async function () {
  this.password = await bcrypt
    .genSalt(10)
    .then((salt) => {
      return bcrypt.hash(this.password, salt);
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(this.password);
});

const User = mongoose.model("User", userSchema);

// User.insertOne({
//   name: "Yosua",
//   email: "yosuaw@gmail.com",
//   password: "12345678",
// });

module.exports = User;
