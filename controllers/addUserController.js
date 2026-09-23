import { pool } from "../db/index.js";
import validator from "validator";
import bcrypt from "bcryptjs";

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,15}$/;

export async function addUser(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!validator.isEmail(email) || !USERNAME_REGEX.test(username)) {
        return res.status(400).json({ message: "Invalid email or username format" });
    }   

    const encryptedPassword = await bcrypt.hash(password, 10);

    try {
        await pool.query("BEGIN")

        const user = await pool.query('SELECT username FROM Users WHERE username = $1 OR email = $2', [username, email]);

        if (user.rows.length > 0) {
            return res.status(400).json({ message: "Username or email already exists" });
        }
        
        await pool.query(
            "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3)",
            [username, email, encryptedPassword]
        );

        await pool.query("COMMIT");

        res.json({ message: "User created" });
    } catch (error) {
        await pool.query("ROLLBACK");
        res.status(500).json({ message: "Internal Server Error" });
    } finally {
        await pool.end();
    }
}