const { Product, User, History } = require("../models/index");

const authorization = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      throw { name: "Not Found" };
    }

    if (product.AuthorId === req.user.id) {
      await History.create({
        description: `Product with name ${product.name} success delete`,
      });
      next();
    } else {
      const findUser = await User.findByPk(req.user.id);
      if (findUser.role === "Admin") {
        await History.create({
          description: `Product with name ${product.name} success delete`,
        });
        next();
      } else {
        throw { name: "Forbidden" };
      }
    }
  } catch (error) {
    if (error.name === "Not Found") {
      res.status(404).json({ message: "Data not found" });
    } else if (error.name === "Forbidden") {
      res.status(403).json({ message: "Your are not authorized" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

module.exports = authorization;
