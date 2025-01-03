import User from "./User";
import Favorite from "./Favorite";

//tables
User.hasMany(Favorite, { foreignKey: "user_id", onDelete: "CASCADE" });
Favorite.belongsTo(User, { foreignKey: "user_id" });

export { User, Favorite };
