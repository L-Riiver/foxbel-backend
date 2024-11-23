import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";

interface UserAttributes {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password_hash: string;
  phone_number?: string;
  gender?: string;
  profile_picture?: string;
  created_at?: Date;
  updated_at?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "created_at" | "updated_at"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public first_name!: string;
  public last_name!: string;
  public email!: string;
  public password_hash!: string;
  public phone_number?: string;
  public gender?: string;
  public profile_picture?: string;
  public created_at?: Date;
  public updated_at?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    phone_number: { type: DataTypes.STRING },
    gender: { type: DataTypes.STRING },
    profile_picture: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "user",
    timestamps: true,
  }
);

export default User;