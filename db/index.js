import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "VinWin",
    password: "VinWinProject",
    port: 5432
});

