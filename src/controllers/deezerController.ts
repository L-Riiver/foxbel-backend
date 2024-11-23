import { Request, Response } from "express";
import { searchDeezer } from "../services/deezerService";

export const searchTracks = async (req: Request, res: Response): Promise<void> => {
  const query = req.query.q as string;

  if (!query) {
    res.status(400).json({ error: "Query parameter 'q' is required" });
    return;
  }

  try {
    const data = await searchDeezer(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
