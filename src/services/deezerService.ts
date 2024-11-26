import axios from "axios";

const BASE_URL = process.env.DEEZER_API_URL || "https://api.deezer.com";

export const searchDeezer = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: { q: query },
    });

    // clean data
    const cleanedData = response.data.data.map((track: any) => ({
      id: track.id,
      title: track.title,
      artist: track.artist.name,
      artist_img: track.artist.picture_big,
      preview: track.preview,
      album: track.album.title,
      album_cover: track.album.cover_big,
    }));

    return { total: response.data.total, tracks: cleanedData };
  } catch (error) {
    console.error("Error fetching data from Deezer:", error);
    throw new Error("Failed to fetch data from Deezer.");
  }
};

