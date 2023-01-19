const {
  User,
  Product,
  Category,
  History,
  Favorite,
} = require("../models/index");
const { bcrypt, jwt, getToken } = require("../helpers/index");
const { OAuth2Client } = require("google-auth-library");

class CustomerController {
  static async getAll(req, res, next) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
  static async Register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const [row, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username,
          email,
          password,
          role: "Customer",
          phoneNumber,
          address,
        },
      });
      res.status(201).json({
        message: `Customers dengan id ${created.id} successfully created`,
      });
    } catch (error) {
      console.log(error, "err");
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
          role: "Customer",
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
        role: "Customer",
      });
    } catch (error) {
      next(error);
    }
  }
  static async AddFavorite(req, res, next) {
    try {
      const { id } = req.user;
      const { productId } = req.params;
      const addFavorite = await Favorite.create({
        CustomerId: id,
        ProductId: productId,
      });

      res.status(201).json({ addFavorite });
    } catch (error) {
      next(error);
    }
  }
  static async ListFavorite(req, res, next) {
    try {
      const { id } = req.user;
      const allFavorite = await Favorite.findAll({
        where: {
          CustomerId: id,
        },
        include: {
          model: Product,
        },
      });
      res.status(200).json(allFavorite);
    } catch (error) {
      next(error);
    }
  }
  static async selectDetailProduct(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) throw { name: "not found detail" };
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustomerController;
