import { useMemo } from "react";
import { buildSky, project } from "../lib/starField.js";

export default function StarMap({ dateStr, lat, lng, size = 480 }) {
  const sky = useMemo(() => buildSky(dateStr, lat, lng), [dateStr, lat, lng]);
  const R = size / 2 - 20;
  const C = size / 2;

  return (
    <svg width={size} height={size} style={{ background: "#000", borderRadius: "50%", border: "2px solid #555" }}>
      {sky.backgroundStars.map((s, i) => (
        <circle key={i} cx={C + s.x * R} cy={C + s.y * R} r={s.size} fill="#fff" opacity={0.8} />
      ))}
      {sky.shown.map((c) => (
        <g key={c.name}>
          {c.lines.map(([a, b], i) => {
            const [x1, y1] = project(c, ...c.points[a]);
            const [x2, y2] = project(c, ...c.points[b]);
            return (
              <line key={i} x1={C + x1 * R} y1={C + y1 * R} x2={C + x2 * R} y2={C + y2 * R}
                stroke="#8fa8c9" strokeWidth={0.6} opacity={0.7} />
            );
          })}
          {c.points.map(([px, py], i) => {
            const [x, y] = project(c, px, py);
            return <circle key={i} cx={C + x * R} cy={C + y * R} r={1.4} fill="#fff" />;
          })}
        </g>
      ))}
    </svg>
  );
}
