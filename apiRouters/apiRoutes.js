import express from "express";
import { addUser, loginUser, authUser } from "../controllers/userController.js";
    
export const authRouter = express.Router();

authRouter.get("/me", authUser);

authRouter.post("/createUser", addUser);

authRouter.post("/loginUser", loginUser);
