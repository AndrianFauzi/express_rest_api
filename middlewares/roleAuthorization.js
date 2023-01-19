const { Product, User } = require("../models/index");

const roleAuthorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      throw { name: "Product not found" };
    }
    if (product.AuthorId === req.user.id) {
      next();
    } else {
      const findUser = await User.findByPk(req.user.id);
      if (findUser.role === "Admin") {
        next();
      } else {
        throw { name: "unauthorized" };
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = roleAuthorization;
