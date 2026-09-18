import StarField from "./StarField.jsx";
import DegreeRing from "./DegreeRing.jsx";

// shape: "circle" (solo círculo) o "ring" (círculo + anillo de grados)
export default function PosterMap({ dateStr, lat, lng, shape = "circle", size = 480 }) {
  const C = size / 2;
  const hasRing = shape === "ring";
  const outerRadius = C - 10;
  const starRadius = hasRing ? outerRadius - 42 : outerRadius; // deja espacio para el anillo

  return (
    <svg width={size} height={size} style={{ background: "#000", borderRadius: hasRing ? 0 : "50%", border: hasRing ? "none" : "2px solid #555" }}>
      <StarField dateStr={dateStr} lat={lat} lng={lng} center={C} radius={starRadius} />
      {hasRing && <DegreeRing center={C} radius={outerRadius} />}
    </svg>
  );
}
