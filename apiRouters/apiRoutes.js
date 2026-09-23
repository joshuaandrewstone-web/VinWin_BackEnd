import express from "express";
import { addUser, loginUser } from "../controllers/userController.js";

export const authRouter = express.Router();

authRouter.post("/createUser", addUser);
authRouter.post("/loginUser", loginUser);