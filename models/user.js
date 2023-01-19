"use strict";
const { Model } = require("sequelize");
const { bcrypt } = require("../helpers/index");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.favorite, { foreignKey: "CustomerId" });
      User.belongsToMany(models.Product, {
        through: "Favorite",
        foreignKey: "CustomerId",
      });
      User.hasMany(models.Product, { foreignKey: "AuthorId" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: {
            msg: "email is required",
          },
          notNull: {
            msg: "email is required",
          },
          isEmail: {
            msg: "invalid format email",
          },
        },
      },
      password: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        defaultValue: "Admin",
      },
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance, option) => {
    instance.password = bcrypt.hashSync(instance.password, 8);
  });
  return User;
};
