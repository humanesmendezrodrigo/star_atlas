import { Router } from "express";

const router = Router();

// Almacenamiento en memoria por ahora; se cambiará por una tabla real (MySQL/PostgreSQL) más adelante.
const posters = new Map();
let nextId = 1;

router.post("/", (req, res) => {
  const { dateStr, lat, lng, city, title, message, shape, spotifyUri } = req.body;
  if (!dateStr || lat === undefined || lng === undefined) {
    return res.status(400).json({ error: "Faltan dateStr, lat o lng" });
  }
  const id = String(nextId++);
  posters.set(id, { id, dateStr, lat, lng, city, title, message, shape, spotifyUri });
  res.status(201).json(posters.get(id));
});

router.get("/:id", (req, res) => {
  const poster = posters.get(req.params.id);
  if (!poster) return res.status(404).json({ error: "No encontrado" });
  res.json(poster);
});

export default router;
