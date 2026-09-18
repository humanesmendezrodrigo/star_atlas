import express from "express";
import cors from "cors";
import postersRouter from "./routes/posters.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/posters", postersRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`));
