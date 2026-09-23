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
        
        const result = await pool.query(
            "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3) RETURNING id",
            [username, email, encryptedPassword]
        );

        await pool.query("COMMIT");

        const insertedUserId = result.rows[0]?.id;

        req.session.userId = insertedUserId;

        res.json({ message: "User created" });
    } catch (error) {
        await pool.query("ROLLBACK");
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function loginUser(req, res) {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await pool.query('SELECT individualid, password FROM Users WHERE username = $1', [username]);

        if (user.rows.length === 0) {
            return res.status(400).json({ message: "Invalid username or password" });
        }


        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        req.session.userId = user.rows[0].individualid;
        console.log(`User ${username} ${req.session.userId} logged in successfully`);
        res.json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}