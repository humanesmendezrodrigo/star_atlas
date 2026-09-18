import { seedFrom, mulberry32 } from "./seed.js";
import { CONSTELLATIONS } from "../data/constellations.js";

// Genera el "cielo" completo para una fecha/ubicación: siempre el mismo resultado
// para los mismos parámetros (reproducible), sin cálculo astronómico real.
export function buildSky(dateStr, lat, lng) {
  const rand = mulberry32(seedFrom(dateStr, lat, lng));

  const backgroundStars = Array.from({ length: 340 }, () => {
    const angle = rand() * Math.PI * 2;
    const r = Math.sqrt(rand()) * 0.97;
    const tintRoll = rand();
    return {
      x: Math.cos(angle) * r,
      y: Math.sin(angle) * r,
      size: rand() * 1.6 + 0.3,
      twinkleDelay: rand() * 4,
      twinkleDuration: 2 + rand() * 3,
      tint: tintRoll < 0.08 ? "warm" : tintRoll < 0.16 ? "cool" : "neutral",
    };
  });

  const shown = [...CONSTELLATIONS]
    .sort(() => rand() - 0.5)
    .slice(0, 6 + Math.floor(rand() * 2))
    .map((c) => ({
      ...c,
      cx: (rand() - 0.5) * 1.2,
      cy: (rand() - 0.5) * 1.2,
      rotation: rand() * Math.PI * 2,
      scale: 0.12 + rand() * 0.08,
    }));

  // Vía Láctea: varias manchas suaves a lo largo de una curva (no una banda recta),
  // para que se vea más orgánica y no siempre en la misma dirección.
  const bandAngle = rand() * Math.PI * 2;
  const curvature = (rand() - 0.5) * 1.1;
  const blobCount = 8;
  const milkyway = { bandAngle, blobs: [] };
  for (let i = 0; i < blobCount; i++) {
    const t = -1.3 + (2.6 * i) / (blobCount - 1);
    const localY = curvature * Math.sin(t * 1.3);
    const tangentSlope = curvature * 1.3 * Math.cos(t * 1.3);
    milkyway.blobs.push({
      t,
      localY,
      angle: Math.atan2(tangentSlope, 1),
      rx: 0.5 + rand() * 0.18,
      ry: 0.15 + rand() * 0.09,
      opacity: 0.08 + rand() * 0.07,
    });
  }

  return { backgroundStars, shown, milkyway };
}

// Proyecta un punto local de una constelación a coordenadas del círculo (-1..1)
export function project(c, x, y) {
  const cos = Math.cos(c.rotation), sin = Math.sin(c.rotation);
  const rx = x * cos - y * sin;
  const ry = x * sin + y * cos;
  return [c.cx + rx * c.scale, c.cy + ry * c.scale];
}
