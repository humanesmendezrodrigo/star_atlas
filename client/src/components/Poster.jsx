import StarField from "./StarField.jsx";
import DegreeRing from "./DegreeRing.jsx";
import { formatFecha } from "../lib/dateFormat.js";
import { wrapText } from "../lib/wrapText.js";
import { THEMES } from "../data/themes.js";

const CARDINALS = [
  { deg: 0, label: "N" },
  { deg: 90, label: "E" },
  { deg: 180, label: "S" },
  { deg: 270, label: "O" },
];

export default function Poster({
  dateStr, dateFormat = "larga", lat, lng,
  shape = "ring", names = "", message = "", location = "",
  theme = THEMES[0],
  width = 560, height = 800, svgRef,
}) {
  const hasRing = shape === "ring";

  const mapSize = width - 120;
  const mapCenterX = width / 2;
  const mapCenterY = 60 + mapSize / 2;
  const C = mapSize / 2;
  const outerRadius = C - 10;
  const starRadius = hasRing ? outerRadius - 42 : outerRadius;
  const extraBottom = hasRing ? 20 : 0;

  const messageFontSize = 22;
  const messageLineHeight = 30;
  const messageLines = wrapText(message, width - 100, `${messageFontSize}px 'Dancing Script'`);
  const messageExtraHeight = Math.max(0, messageLines.length - 1) * messageLineHeight;
  const totalHeight = height + messageExtraHeight;

  const messageStartY = mapCenterY + C + extraBottom + 90;

  return (
    <svg ref={svgRef} width={width} height={totalHeight} viewBox={`0 0 ${width} ${totalHeight}`} style={{ background: theme.background }}>
      {/* marco doble de la hoja */}
      <rect x={14} y={14} width={width - 28} height={totalHeight - 28} fill="none" stroke={theme.border} strokeWidth={1.5} />
      <rect x={20} y={20} width={width - 40} height={totalHeight - 40} fill="none" stroke={theme.border} strokeWidth={0.75} />

      <g transform={`translate(${mapCenterX - C}, ${mapCenterY - C})`}>
        <circle cx={C} cy={C} r={outerRadius + 2} fill={theme.skyBackground} />
        {!hasRing && <circle cx={C} cy={C} r={outerRadius} fill="none" stroke={theme.tickColor} strokeWidth={1.5} />}
        <StarField
          dateStr={dateStr} lat={lat} lng={lng} center={C} radius={starRadius}
          starColor={theme.starColor} lineColor={theme.lineColor} milkywayColor={theme.milkywayColor}
        />
        {hasRing && (
          <DegreeRing center={C} radius={outerRadius}
            tickColor={theme.tickColor} textColor={theme.tickTextColor} ringColor={theme.tickColor} />
        )}
        {hasRing && CARDINALS.map(({ deg, label }) => {
          const angle = (deg / 180) * Math.PI - Math.PI / 2;
          const x = C + (outerRadius + 20) * Math.cos(angle);
          const y = C + (outerRadius + 20) * Math.sin(angle);
          return (
            <text key={label} x={x} y={y} fill={theme.tickTextColor} fontSize={11} letterSpacing={2}
              textAnchor="middle" dominantBaseline="middle" fontFamily="Cormorant Garamond, serif">
              {label}
            </text>
          );
        })}
      </g>

      {/* nombres / título */}
      {names && (
        <text x={width / 2} y={mapCenterY + C + extraBottom + 50} fill={theme.textPrimary} fontSize={26}
          textAnchor="middle" fontFamily="Playfair Display, serif" fontWeight={700}>
          {names}
        </text>
      )}

      {/* mensaje personalizado, partido en varias líneas si hace falta */}
      {messageLines.map((line, i) => (
        <text key={i} x={width / 2} y={messageStartY + i * messageLineHeight} fill={theme.textPrimary} fontSize={messageFontSize}
          textAnchor="middle" fontFamily="Dancing Script, cursive">
          {line}
        </text>
      ))}

      {/* fecha + ubicación */}
      <text x={width / 2} y={totalHeight - 56} fill={theme.textSecondary} fontSize={12} letterSpacing={1}
        textAnchor="middle" fontFamily="Cormorant Garamond, serif">
        {location}
      </text>
      <text x={width / 2} y={totalHeight - 40} fill={theme.textSecondary} fontSize={12} letterSpacing={1}
        textAnchor="middle" fontFamily="Cormorant Garamond, serif">
        {formatFecha(dateStr, dateFormat)}
      </text>
    </svg>
  );
}
