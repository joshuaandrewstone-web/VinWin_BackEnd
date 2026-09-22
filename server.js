import express from "express";
import cors from "cors";
import { pool } from "./db/index.js";
import { apiRouter } from "./apiRouters/apiRoutes.js";

const PORT = 8000;

const app = express();

app.use(cors());

app.use('/api', apiRouter)

app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});