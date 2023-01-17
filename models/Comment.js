const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    body: {
      // STRING defaults to VARCHAR(255), therefore redefined blog body to allow maximum size
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "blog",
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
    modelName: "comment",
  }
);

module.exports = Comment;
