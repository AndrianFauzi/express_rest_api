const { User, Product, Category, History } = require("../models/index");
const { bcrypt, jwt, getToken } = require("../helpers/index");
const { OAuth2Client } = require("google-auth-library");
class Controller {
  static async getAll(req, res, next) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async createProduct(req, res, next) {
    try {
      const { id } = req.user;
      const { name, description, price, imgUrl, CategoryId } = req.body;

      const historyCreate = `Product with name ${name} success added`;
      await History.create({
        description: historyCreate,
      });
      const create = await Product.create({
        name,
        description,
        price,
        imgUrl,
        CategoryId,
        AuthorId: id,
      });

      res.status(201).json({ create });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const id = req.params.id;

      const deleteProduct = Product.findByPk(id);

      if (!deleteProduct) throw { name: "not found" };
      await Product.destroy({
        where: {
          id: id,
        },
      });

      res.status(200).json({
        message: `succes to delete`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async selectDetailProduct(req, res, next) {
    try {
      const id = req.params.id;

      const product = await Product.findByPk(id);
      if (!product) {
        throw { name: "not found detail" };
      }
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async statusProduct(req, res, next) {
    try {
      const id = req.params.id;
      const status = req.body.status;

      const findProduct = await Product.findByPk(id);
      if (!findProduct) throw { name: "Product not found" };

      const updatedStatus = await Product.update({ status }, { where: { id } });
      History.create({
        description: `Product with ${id} has been updated from ${findProduct.status} to ${status}`,
      });

      res.status(201).json({
        message: `success updated status product`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async Register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;

      const newUser = await User.findOrCreate({
        where: {
          email,
        },
        default: {
          username,
          email,
          password,
          phoneNumber,
          address,
        },
      });

      res.status(201).json({
        message: `User dengan id ${newUser.id} successfully created`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async Login(req, res, next) {
    try {
      const { email, password } = req.body;

      const foundUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!foundUser) {
        throw { name: "user not found" };
      }

      const isValidPassword = bcrypt.compareSync(password, foundUser.password);

      if (!isValidPassword) {
        throw { name: "error invalid username or email or password" };
      }
      const payload = { id: foundUser.id };

      const token = getToken(payload);

      res.status(200).json({
        access_token: token,
        username: foundUser.username,
        role: foundUser.role,
      });
    } catch (error) {
      next(error);
    }
  }

  static async googleSignIn(req, res, next) {
    try {
      const { access_token } = req.headers;
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: access_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: "dari_google",
          role: "Staff",
        },

        hooks: false,
      });

      const token = getToken({
        id: user.id,
      });

      res.status(200).json({
        username: payload.name,
        access_token: token,
        email: payload.email,
        message: "Success sign in with google",
        role: "Staff",
      });
    } catch (error) {
      next(error);
    }
  }

  static async getHistory(req, res, next) {
    try {
      const history = await History.findAll();
      res.status(200).json({ history });
    } catch (error) {
      next(error);
    }
  }

  static async editProduct(req, res, next) {
    try {
      const id = req.params.id;
      const { name, description, price, imgUrl, CategoryId } = req.body;
      const findProduct = await Product.findByPk(id);
      if (!findProduct) throw { name: "not found product with this id" };

      const updatedProduct = await Product.update(
        {
          name,
          description,
          price,
          imgUrl,
          CategoryId,
        },
        { where: { id } }
      );
      res.status(201).json(`Success update`);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
