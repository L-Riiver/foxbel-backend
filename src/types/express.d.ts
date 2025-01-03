// src/express.d.ts
import { User } from "./models";  // Ajusta esta ruta según donde esté tu modelo User
import { Favorite } from "../models";

declare global {
  namespace Express {
    //Declare file and user objects
    interface Request {
      file?: {
        filename: string;
        path: string;
      };
      user?: string | JwtPayload; 
    }
  }
}
