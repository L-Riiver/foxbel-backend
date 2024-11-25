var multer = require('multer');
import { Router } from 'express';
import { loginUser, registerUser, getUserProfile, updateUserProfile } from '../controllers/userController';
import { authenticateToken } from '../middlewares/authMiddleware';
import { Request, Response } from 'express';

// Configuración de multer para subir archivos
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: any, destination: string) => void) => {
    cb(null, 'img/uploads/'); // Carpeta donde se guardarán los archivos
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: any, filename: string) => void) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Nombre único para el archivo
  },
});

const router = Router();
const upload = multer({ storage });

// Rutas
router.post("/register", registerUser);
router.post("/login", loginUser);

// Rutas protegidas con autenticación
router.put("/update", authenticateToken, upload.single("profile_picture"), updateUserProfile);
router.get("/me", authenticateToken, getUserProfile);

export default router;
