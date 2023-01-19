if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const Controller = require("./controllers/controller");
const CustomerController = require("./controllers/CustomerController");
const app = express();
var cors = require("cors");
const port = process.env.PORT || 10000;
const authentication = require("./middlewares/authentication");
const authorization = require("./middlewares/authorization");
const errorHandler = require("./middlewares/errorHandler");
const roleAuthorization = require("./middlewares/roleAuthorization");

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
// Admin - Staff
app.post("/register", Controller.Register);
app.post("/login", Controller.Login);
app.post("/google-sign-in", Controller.googleSignIn);

// Customer
app.post("/pub/register", CustomerController.Register);
app.post("/pub/login", CustomerController.Login);
app.post("/pub/google-sign-in", CustomerController.googleSignIn);
app.get("/pub/listProducts", CustomerController.getAll);
app.get("/pub/detailsProduct/:id", CustomerController.selectDetailProduct);
app.use(authentication);
app.get("/pub/listFavorite", CustomerController.ListFavorite);
app.post("/pub/addFavorite/:productId", CustomerController.AddFavorite);
app.get("/listProducts", Controller.getAll);
app.get("/listProducts/:id", Controller.selectDetailProduct);
app.post("/createProduct", Controller.createProduct);
app.patch(
  "/editStatusProduct/:id",
  roleAuthorization,
  Controller.statusProduct
);
app.put("/editProduct/:id", roleAuthorization, Controller.editProduct);
app.delete("/deleteProduct/:id", authorization, Controller.deleteProduct);
app.get("/history", Controller.getHistory);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// module.exports = app;
