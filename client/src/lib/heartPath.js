// Path de un corazón en una caja local de 100x100 (aprox), pensado para
// escalarse y centrarse con translate/scale desde quien lo use.
export const HEART_PATH =
  "M50,15 C35,-5 0,10 0,37 C0,60 25,75 50,95 C75,75 100,60 100,37 C100,10 65,-5 50,15 Z";

// Devuelve el transform necesario para centrar el corazón en (cx, cy) con un ancho dado.
export function heartTransform(cx, cy, size) {
  const scale = size / 100;
  return `translate(${cx - size / 2}, ${cy - size / 2}) scale(${scale})`;
}
