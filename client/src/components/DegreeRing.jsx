// Dibuja el anillo de grados: marcas menores cada 2° y números cada 10°,
// como en un transportador. Devuelve solo <g>, para combinarse en el mismo <svg>.
export default function DegreeRing({ center, radius, tickLength = 8, tickColor = "#aaa", textColor = "#ccc", ringColor = "#555" }) {
  const C = center;
  const ticks = [];
  const labels = [];

  for (let deg = 0; deg < 360; deg += 2) {
    const angle = (deg / 180) * Math.PI - Math.PI / 2; // 0° arriba, aumenta en sentido horario
    const x1 = C + (radius - tickLength) * Math.cos(angle);
    const y1 = C + (radius - tickLength) * Math.sin(angle);
    const x2 = C + radius * Math.cos(angle);
    const y2 = C + radius * Math.sin(angle);
    ticks.push(
      <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke={tickColor} strokeWidth={deg % 10 === 0 ? 1 : 0.5} />
    );
  }

  for (let deg = 0; deg < 360; deg += 10) {
    const angle = (deg / 180) * Math.PI - Math.PI / 2;
    const lx = C + (radius - tickLength - 12) * Math.cos(angle);
    const ly = C + (radius - tickLength - 12) * Math.sin(angle);
    labels.push(
      <text
        key={deg}
        x={lx}
        y={ly}
        fill={textColor}
        fontSize={10}
        textAnchor="middle"
        dominantBaseline="middle"
        transform={`rotate(${deg}, ${lx}, ${ly})`}
      >
        {deg}
      </text>
    );
  }

  return (
    <g>
      <circle cx={C} cy={C} r={radius} fill="none" stroke={ringColor} strokeWidth={1} />
      <circle cx={C} cy={C} r={radius - tickLength - 22} fill="none" stroke={ringColor} strokeWidth={1} />
      {ticks}
      {labels}
    </g>
  );
}
