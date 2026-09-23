import express from "express";
import { addUser } from "../controllers/addUserController.js";

export const apiRouter = express.Router();

apiRouter.post("/createUser", addUser);