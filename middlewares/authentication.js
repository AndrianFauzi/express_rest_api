const { User } = require("../models/index");
const { readPayload } = require("../helpers/index");
const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    const decoded = readPayload(access_token);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw { name: "Unauthorized" };
    }

    req.user = {
      id: user.id,
      email: user.email,
    };
    next();
  } catch (error) {
    // console.log(error, "<<<<<<<");
    if (error.name === "Unauthorized") {
      res.status(401).json({ message: "Token invalid" });
    } else if (error.name === "JsonWebTokenError") {
      res
        .status(401)
        .json({ message: "error invalid username or email or password" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = authentication;
