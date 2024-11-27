import { Request, Response } from "express";
import { Favorite } from "../models";
import sequelize from "../config/database";

export const addFavorite = async (req: Request, res: Response): Promise<void> => {
  const { title, artist, album, album_cover, preview } = req.body;
  const user_id = (req as any).user.id;

  //permission
  if (!user_id) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    //Stored procedure 
    await sequelize.query(
      "CALL AddFavorite(:user_id, :title, :artist, :album, :album_cover, :preview)", 
      {
        replacements: {
          user_id,
          title,
          artist,
          album,
          album_cover: album_cover,
          preview,
        },
      }
    );

    res.status(201).json({ message: "Añadido correctamente!" });
  } catch (error) {
    console.error("Error adding track to favorites:", error);
    res.status(500).json({ error: "Error adding track to favorites" });
  }
};

export const removeFavorite = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;
  const user_id = (req as any).user.id;

  //permission
  if (!user_id) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const favorite = await Favorite.findOne({ where: { id, user_id } });

    if (!favorite) {
      res.status(404).json({ message: "Favorite not found" });
      return;
    }

    await favorite.destroy();
    res.status(200).json({ message: "Track removed from favorites" });
  } catch (error) {
    console.error("Error removing track from favorites:", error);
    res.status(500).json({ error: "Error removing track from favorites" });
  }
};

export const getFavorites = async (req: Request, res: Response): Promise<void> => {
  const user_id = (req as any).user.id;

  //permission
  if (!user_id) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const favorites = await Favorite.findAll({ where: { user_id } });
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Error fetching favorites" });
  }
};
