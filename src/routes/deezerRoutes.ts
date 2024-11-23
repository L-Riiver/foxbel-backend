import { Router } from "express";
import { searchTracks } from "../controllers/deezerController";

const router = Router();

router.get("/search", searchTracks);

export default router;
