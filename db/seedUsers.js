import { pool } from "./index.js";

const seedUsers = async (req, res) => {
    try {
        console.log(req.body);

        await pool.query('BEGIN');

        // await pool.query(`
        //     INSERT INTO Users (name, email, password)
        //     VALUES ($1, $2, $3)
        // `, ['John Doe', 'john@example.com', 'password123']);

        await pool.query('COMMIT');
        console.log("Users seeded successfully");
    } catch (err) {
        await pool.query('ROLLBACK');
        console.error("Error seeding users:", err);
    } finally {
        await pool.end();
    }
};

seedUsers();