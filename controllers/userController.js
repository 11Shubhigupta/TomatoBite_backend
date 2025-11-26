import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

// Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await userModel.findOne({ email });
    if (exist) return res.status(400).json({ message: "User already exists" });

    const hashPass = await bcrypt.hash(password, 10);

    await userModel.create({
      name,
      email,
      password: hashPass,
    });

    res.json({ message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Wrong password" });

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
