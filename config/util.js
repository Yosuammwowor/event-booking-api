const isValidString = (data) => {
  return typeof data === "string";
};

const noRoutes = (req, res) => {
  res.status(404).json({ message: "No Route found" });
};

module.exports = { isValidString, noRoutes };
