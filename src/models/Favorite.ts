import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Favorite extends Model {}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: { type: DataTypes.STRING },
    artist: { type: DataTypes.STRING },
    album: { type: DataTypes.STRING },
    album_cover: { type: DataTypes.STRING(500)},
    preview: { type: DataTypes.STRING(500)},
  },
  { sequelize, modelName: "favorite", timestamps: true }
);

export default Favorite;
