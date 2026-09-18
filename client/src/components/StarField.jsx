import { useMemo } from "react";
import { buildSky, project } from "../lib/starField.js";

const TINTS = { warm: "#ffdfb0", cool: "#c9dcff", neutral: null };

// Devuelve el contenido (franja de fondo + estrellas + constelaciones) como <g>,
// para poder combinarlo con otros elementos dentro de un mismo <svg>.
export default function StarField({
  dateStr, lat, lng, center, radius,
  starColor = "#fff", lineColor = "#8fa8c9", milkywayColor = "207,216,255",
}) {
  const sky = useMemo(() => buildSky(dateStr, lat, lng), [dateStr, lat, lng]);
  const C = center;
  const R = radius;
  const blobGradId = "milkyBlob-" + Math.round(C);
  const haloGradId = "starHalo-" + Math.round(C);

  return (
    <g>
      <style>{`
        @keyframes twinkle { 0%, 100% { opacity: 0.25; } 50% { opacity: 1; } }
        .star { animation-name: twinkle; animation-iteration-count: infinite; animation-timing-function: ease-in-out; }
      `}</style>

      <defs>
        <radialGradient id={blobGradId}>
          <stop offset="0%" stopColor={`rgb(${milkywayColor})`} stopOpacity="0.55" />
          <stop offset="100%" stopColor={`rgb(${milkywayColor})`} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={haloGradId}>
          <stop offset="0%" stopColor={starColor} stopOpacity="0.55" />
          <stop offset="100%" stopColor={starColor} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Vía Láctea: varias manchas suaves a lo largo de una curva, con ángulo distinto cada vez */}
      <g transform={`rotate(${(sky.milkyway.bandAngle * 180) / Math.PI} ${C} ${C})`}>
        {sky.milkyway.blobs.map((b, i) => {
          const x = C + b.t * R * 1.05;
          const y = C + b.localY * R;
          const angleDeg = (b.angle * 180) / Math.PI;
          return (
            <ellipse key={i} cx={x} cy={y} rx={b.rx * R} ry={b.ry * R}
              transform={`rotate(${angleDeg} ${x} ${y})`}
              fill={`url(#${blobGradId})`} opacity={b.opacity} />
          );
        })}
      </g>

      {sky.backgroundStars.map((s, i) => {
        const fill = TINTS[s.tint] || starColor;
        const big = s.size > 1.3;
        return (
          <g key={i}>
            {big && <circle cx={C + s.x * R} cy={C + s.y * R} r={s.size * 3.2} fill={`url(#${haloGradId})`} />}
            <circle className="star" cx={C + s.x * R} cy={C + s.y * R} r={s.size} fill={fill}
              style={{ animationDelay: `${s.twinkleDelay}s`, animationDuration: `${s.twinkleDuration}s` }} />
          </g>
        );
      })}

      {sky.shown.map((c) => (
        <g key={c.name}>
          {c.lines.map(([a, b], i) => {
            const [x1, y1] = project(c, ...c.points[a]);
            const [x2, y2] = project(c, ...c.points[b]);
            return (
              <line key={i} x1={C + x1 * R} y1={C + y1 * R} x2={C + x2 * R} y2={C + y2 * R}
                stroke={lineColor} strokeWidth={0.8} strokeLinecap="round" opacity={0.75} />
            );
          })}
          {c.points.map(([px, py], i) => {
            const [x, y] = project(c, px, py);
            return (
              <g key={i}>
                <circle cx={C + x * R} cy={C + y * R} r={5} fill={`url(#${haloGradId})`} />
                <circle cx={C + x * R} cy={C + y * R} r={1.7} fill={starColor} />
              </g>
            );
          })}
        </g>
      ))}
    </g>
  );
}
