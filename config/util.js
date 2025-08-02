const isValidString = (data) => {
  return typeof data === "string";
};

const isValidNumber = (data) => {
  return Number.isInteger(data);
};

const noRoutes = (req, res) => {
  res.status(404).json({ message: "No Route found" });
};

module.exports = { noRoutes, isValidString, isValidNumber };
