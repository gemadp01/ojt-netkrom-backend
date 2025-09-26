import User from "../models/User.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, username, email, phone, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      username,
      email,
      phone,
      passwordHash,
      role: "user",
    });
    res
      .status(201)
      .json({ success: true, message: "User registered successfully!", user });
  } catch (err) {
    console.error("Error registering user: ", err);
    res
      .status(500)
      .json({ success: false, message: "User registration failed." });
  }
};

export const login = async (req, res) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const { username, password } = req.body;

  // cek user
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // cek password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res
      .status(401)
      .json({ message: "Username or password is incorrect" });
  }

  // generate token
  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.json({
    success: true,
    message: "Login successful",
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const getUserByIdFromToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};
