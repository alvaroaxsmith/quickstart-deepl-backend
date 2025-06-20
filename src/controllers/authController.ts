import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { User } from "../entity/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtConstants } from "../config/auth";

const userRepository = AppDataSource.getRepository(User);

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res
      .status(400)
      .json({ error: "Missing required fields: username, email, password." });
    return;
  }

  try {
    const existingUser = await userRepository.findOne({
      where: [{ username }, { email }],
    });
    if (existingUser) {
      res.status(409).json({ error: "Username or email already exists." });
      return;
    }

    const password_hash = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({ username, email, password_hash });
    await userRepository.save(newUser);

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ error: "An unknown error occurred during registration." });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res
      .status(400)
      .json({ error: "Missing required fields: username and password." });
    return;
  }

  try {
    const user = await userRepository.findOne({ where: { username } });
    if (!user) {
      res.status(401).json({ error: "Invalid credentials." });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid credentials." });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      jwtConstants.secret,
      { expiresIn: "1h" }
    );
    res.json({ message: "Login successful.", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An unknown error occurred during login." });
  }
};
