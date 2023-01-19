const errorHandler = (error, req, res, next) => {
  if (error.name === "SequelizeValidationError") {
    res.status(400).json({ message: error.errors[0].message });
  }
  if (error.name === "error invalid username or email or password") {
    res.status(401).json({
      error: "error invalid email or password",
    });
  }

  if (error.name === "user not found") {
    res.status(404).json({ message: "user not found" });
  }

  if (error.name === "email has already register") {
    res.status(409).json({ message: "email has already register" });
  }
  if (error.errors) {
    return res.status(400).json({ errors: "Validation error" });
  }

  if (error.name === "not found") {
    return res.status(404).json({ message: "error not found" });
  }

  if (error.name === "not found detail") {
    return res.status(404).json({ message: "not found" });
  }

  if (error.name === "Product not found") {
    return res.status(404).json({ message: "Product not found" });
  }

  if (error.name === "unauthorized") {
    return res.status(401).json({ message: "unauthorized" });
  }
};

module.exports = errorHandler;
