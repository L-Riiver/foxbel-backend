import { Request, Response } from "express";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");
import { User } from "../models";

import fs from "fs";
import path from "path";

import { authenticateToken } from "../middlewares/authMiddleware";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Register
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { first_name, last_name, email, password, gender, phone_number } = req.body;

  if (!first_name || !last_name || !email || !password) {
    // res.status(400).json({ error: "Missing required fields" });
    res.status(400).json({ error: "Missing required fields", first_name: first_name,last_name: last_name, email: email, password: password});
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      first_name,
      last_name,
      email,
      password_hash: hashedPassword,
      gender,
      phone_number,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

// Login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Missing email or password" });
    return;
  }
  const isEmail = (emailOrPhone: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(emailOrPhone);
  };
  let user;

  try {
    // Check email or phone number
    if (isEmail(email)) {
      user = await User.findOne({ where: { email: email } });
    } else {
      user = await User.findOne({ where: { phone_number: email } });
    }


    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      res.status(401).json({ error: "Credenciales inválidas" });
      return;
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.first_name },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ 
      message: "Login successful", 
      token, 
      user: { 
        id: user.id, 
        first_name: user.first_name, 
        last_name: user.last_name, 
        email: user.email,
        profile_picture: user.profile_picture,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to log in" });
  }
};

// Get User Profile
export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id; 
    const user = await User.findByPk(userId);

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        profile_picture: user.profile_picture,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};

// Update User 
export const updateUserProfile = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.id;
  const { first_name, last_name, email, currentPassword } = req.body;

  if (!currentPassword) {
    res.status(400).json({ message: "Contraseña actual requerida." });
    return;
  }

  try {
    const user = await User.findByPk(userId);

    if (!user || !(await bcrypt.compare(currentPassword, user.password_hash))) {
      res.status(401).json({ message: "Contraseña actual incorrecta." });
      return;
    }

    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.email = email || user.email;

    if (req.file) {
      const publicPath = `http://localhost:5000/img/uploads/${req.file.filename}`; 
      user.profile_picture = publicPath;
    }

    await user.save();

    res.json({
      message: "Perfil actualizado con éxito.",
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        profile_picture: user.profile_picture,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Error al actualizar el perfil." });
  }
};
