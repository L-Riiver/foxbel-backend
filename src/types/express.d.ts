import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      file?: {
        filename: string;
        path: string;
      };
    }
  }
}