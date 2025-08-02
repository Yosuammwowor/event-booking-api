const express = require("express");
const app = express();

const userRoutes = require("./routes/routeUsers");
const eventRoutes = require("./routes/routeEvents");

app.use(express.json());

app.use("/users", userRoutes);
app.use("/events", eventRoutes);

app.listen(3000, () => {
  console.log("Connected to server in http://localhost:3000");
});
