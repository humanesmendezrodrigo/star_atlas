const MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const DIAS = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];

export const DATE_FORMATS = [
  { id: "larga", label: "10 de noviembre de 2016" },
  { id: "dia_semana", label: "Jueves, 10 de noviembre de 2016" },
  { id: "corta", label: "10/11/2016" },
  { id: "iso", label: "2016-11-10" },
];

function cap(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatFecha(dateStr, formatId = "larga") {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  const dateObj = new Date(y, m - 1, d);

  switch (formatId) {
    case "dia_semana":
      return `${cap(DIAS[dateObj.getDay()])}, ${d} de ${MESES[m - 1]} de ${y}`;
    case "corta":
      return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
    case "iso":
      return `${y}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    case "larga":
    default:
      return `${d} de ${MESES[m - 1]} de ${y}`;
  }
}
