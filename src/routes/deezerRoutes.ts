import { Router } from "express";
import { searchTracks } from "../controllers/deezerController";

const router = Router();
//api dezzer
router.get("/search", searchTracks);

export default router;
