import { useRef, useState } from "react";
import Poster from "./components/Poster.jsx";
import { exportSvgToPng } from "./lib/exportImage.js";
import { DATE_FORMATS } from "./lib/dateFormat.js";
import { CIUDADES } from "./data/cities.js";
import { THEMES } from "./data/themes.js";

const SUGERENCIAS = [
  "Bajo las mismas estrellas",
  "Nuestra primera cita",
  "Te elijo cada noche",
  "Nuestro para siempre",
];

export default function App() {
  const [names, setNames] = useState("N1 & N2");
  const [message, setMessage] = useState("Bajo las mismas estrellas");
  const [location, setLocation] = useState("Potosi, Bolivia");
  const [dateStr, setDateStr] = useState("2026-09-18");
  const [shape, setShape] = useState("ring");
  const [dateFormat, setDateFormat] = useState("larga");
  const [themeId, setThemeId] = useState(THEMES[0].id);
  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];

  const svgRef = useRef(null);

  return (
    <div style={{ background: "#0a0a0a", minHeight: "100vh", padding: 24, display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap", color: "#eee", fontFamily: "sans-serif" }}>
      {/* Panel de controles */}
      <div style={{ minWidth: 280, maxWidth: 320, display: "flex", flexDirection: "column", gap: 20 }}>

        <div>
          <label style={{ display: "block", marginBottom: 6, fontSize: 13, opacity: 0.8 }}>Color</label>
          <div style={{ display: "flex", gap: 10 }}>
            {THEMES.map((t) => (
              <button key={t.id} onClick={() => setThemeId(t.id)} title={t.name}
                style={{
                  width: 28, height: 28, borderRadius: "50%", background: t.background,
                  border: themeId === t.id ? "2px solid #e11" : "1px solid #555", cursor: "pointer",
                }} />
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6, fontSize: 13, opacity: 0.8 }}>Nombres</label>
          <input value={names} onChange={(e) => setNames(e.target.value)} placeholder="Ana & Luis"
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6, fontSize: 13, opacity: 0.8 }}>Mensaje</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={2}
            style={{ width: "100%", padding: 8, boxSizing: "border-box", resize: "vertical" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
            {SUGERENCIAS.map((s) => (
              <button key={s} onClick={() => setMessage(s)}
                style={{ fontSize: 11, padding: "4px 8px", background: "#222", color: "#ccc", border: "1px solid #444", borderRadius: 12, cursor: "pointer" }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6, fontSize: 13, opacity: 0.8 }}>Ubicación</label>
          <input list="ciudades" value={location} onChange={(e) => setLocation(e.target.value)}
            placeholder="Ciudad, país" style={{ width: "100%", padding: 8, boxSizing: "border-box" }} />
          <datalist id="ciudades">
            {CIUDADES.map((c) => <option key={c.name} value={c.name} />)}
          </datalist>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #333", margin: "4px 0" }} />

        <div>
          <label style={{ display: "block", marginBottom: 6, fontSize: 13, opacity: 0.8 }}>Fecha</label>
          <input type="date" value={dateStr} onChange={(e) => setDateStr(e.target.value)}
            style={{ width: "100%", padding: 8, boxSizing: "border-box" }} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6, fontSize: 13, opacity: 0.8 }}>Forma</label>
          <select value={shape} onChange={(e) => setShape(e.target.value)} style={{ width: "100%", padding: 8 }}>
            <option value="circle">Círculo simple</option>
            <option value="ring">Círculo con anillo de grados</option>
          </select>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: 6, fontSize: 13, opacity: 0.8 }}>Formato de fecha</label>
          <select value={dateFormat} onChange={(e) => setDateFormat(e.target.value)} style={{ width: "100%", padding: 8 }}>
            {DATE_FORMATS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}
          </select>
        </div>

        <button
          onClick={() => exportSvgToPng(svgRef.current, `${names || "mapa-estelar"}.png`, 3, theme.background)}
          style={{ padding: "10px 16px", background: "#fff", color: "#111", border: "none", borderRadius: 4, cursor: "pointer", fontWeight: 600 }}
        >
          Descargar imagen (PNG)
        </button>
      </div>

      {/* Vista previa del póster */}
      <Poster
        svgRef={svgRef}
        dateStr={dateStr} dateFormat={dateFormat}
        lat={location} lng="" shape={shape}
        names={names} message={message} location={location}
        theme={theme}
      />
    </div>
  );
}