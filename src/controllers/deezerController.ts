import { Request, Response } from "express";
import { searchDeezer } from "../services/deezerService";
//Api search 
export const searchTracks = async (req: Request, res: Response): Promise<void> => {
  const query = req.query.q as string;

  if (!query) {
    res.status(400).json({ error: "'q' required" });
    return;
  }

  try {
    const data = await searchDeezer(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
