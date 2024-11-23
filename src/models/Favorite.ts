import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Favorite extends Model {}

Favorite.init(
  {
    track_id: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING },
    artist: { type: DataTypes.STRING },
    album: { type: DataTypes.STRING },
    album_cover: { type: DataTypes.STRING },
  },
  { sequelize, modelName: "favorite", timestamps: true }
);

export default Favorite;
