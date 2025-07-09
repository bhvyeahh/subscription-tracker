import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
  // Handle user signup logic here
  res.status(201).json({ message: "User signed up successfully!" });
});

authRouter.post("/sign-in", (req, res) => {
  // Handle user signin logic here
  res.status(200).json({ message: "User signed in successfully!" });
});

authRouter.post("/sign-out", (req, res) => {
  // Handle user signout logic here
  res.status(200).json({ message: "User signed out successfully!" });
});

export default authRouter; 