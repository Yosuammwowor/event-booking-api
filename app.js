const express = require("express");
const app = express();

const userRoutes = require("./routes/users");

app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("Connected to server in http://localhost:3000");
});
