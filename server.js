import express from "express";
import cors from "cors";
import { apiRouter } from "./apiRouters/apiRoutes.js";

const PORT = 8000;

const app = express();

app.use(cors());

app.use(express.json());
app.use('/api', apiRouter);

app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});