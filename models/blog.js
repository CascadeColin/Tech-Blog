const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      // STRING defaults to VARCHAR(255), therefore redefined blog body to allow maximum size
      type: DataTypes.STRING(65535),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    // timestamps allows for 'createdAt' and 'updatedAt' to be used for putting timestamps on blogs and comments
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "blog",
  }
);

module.exports = Blog;
