import express from "express";

export const apiRouter = express.Router();

apiRouter.post("/createUser", (req, res) => {
    console.log(req.body);
    res.json({ message: "User creation API is working" });
});