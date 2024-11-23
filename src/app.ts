import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import deezerRoutes from "./routes/deezerRoutes";

//database
import sequelize from "./config/database";
sequelize.sync({ alter: true })
  .then(() => console.log("Database synced!"))
  .catch((err) => console.error("Error syncing database:", err));
  
//dotenv
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/deezer", deezerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
