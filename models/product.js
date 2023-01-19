"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Product.hasMany(models.favorite, { foreignKey: "ProductId" });
      Product.belongsToMany(models.User, {
        through: "Favorite",
        foreignKey: "ProductId",
      });
      Product.belongsTo(models.Category, { foreignKey: "CategoryId" });
      Product.belongsTo(models.User, { foreignKey: "AuthorId" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Nama harus ada!",
          },
          notNull: {
            msg: "Nama harus ada!",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Deskripsi harus ada!",
          },
          notNull: {
            msg: "Deskripsi harus ada!",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Harga harus diisi!",
          },
          notNull: {
            msg: "Harga harus diisi!",
          },
        },
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      AuthorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "active",
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
