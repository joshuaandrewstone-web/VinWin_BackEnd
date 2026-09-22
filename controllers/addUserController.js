import { pool } from "../db/index.js";

export async function addUser(req, res) {
    try {
        console.log(req.body);
        res.json({ message: "User creation API is working" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}