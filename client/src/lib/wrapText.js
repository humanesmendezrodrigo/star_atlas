// Mide el texto con un <canvas> oculto y lo parte en líneas que no superen maxWidth.
let _canvas;
function getCtx(font) {
  if (!_canvas) _canvas = document.createElement("canvas");
  const ctx = _canvas.getContext("2d");
  ctx.font = font;
  return ctx;
}

export function wrapText(text, maxWidth, font) {
  if (!text) return [];
  const ctx = getCtx(font);
  const words = text.split(" ");
  const lines = [];
  let current = "";

  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (current && ctx.measureText(test).width > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}
