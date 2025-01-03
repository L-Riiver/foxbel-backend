import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import deezerRoutes from "./routes/deezerRoutes";
import userRoutes from "./routes/userRoutes";

//database
import sequelize from "./config/database";
import path from "path";

sequelize.sync({ alter: true })
  .then(() => console.log("Database synced!"))
  .catch((err) => console.error("Error syncing database:", err));
  
//dotenv
dotenv.config();

const app = express();
//Cors
app.use(cors());
//server express
app.use(express.json());

//api routes
app.use("/api/deezer", deezerRoutes);
app.use("/api/users", userRoutes);
app.use("/img/uploads", express.static(path.join(__dirname, "../public/img/uploads")));

app.use("/api/favorites", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
