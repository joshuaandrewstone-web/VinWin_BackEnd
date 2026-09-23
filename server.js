import express from "express";
import cors from "cors";
import session from "express-session";
import "dotenv/config";
import { authRouter } from "./apiRouters/apiRoutes.js";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.use('/api/auth', authRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});