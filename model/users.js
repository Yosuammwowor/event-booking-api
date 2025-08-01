const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose
  .connect("mongodb://127.0.0.1:27017/users_db")
  .then(() => {
    console.log("Connection to database success...");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function () {
  // Hash password
  this.password = await bcrypt
    .genSalt(10)
    .then((salt) => {
      return bcrypt.hash(this.password, salt);
    })
    .catch((err) => {
      console.log(err);
    });
  //   console.log(this.password);
});

const User = mongoose.model("User", userSchema);

const user = new User({
  name: "Yosua",
  email: "yosuaw@gmail.com",
  password: "12345678",
  role: "admin",
});

const comparePass = async () => {
  const password = await User.findById("688c70ea56828268666fbda3");
  bcrypt
    .compare("12345678", password.password)
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

comparePass();

// user.save();

// const getData_db = async () => {
//   const users = await User.find();
//   return users;
// };

// getData_db();
