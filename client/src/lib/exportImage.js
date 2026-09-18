// Serializa el <svg> del póster, lo dibuja en un <canvas> en alta resolución
// y dispara la descarga como PNG.
export async function exportSvgToPng(svgElement, filename = "mapa-estelar.png", scale = 3, backgroundColor = "#000") {
  if (!svgElement) return;

  // Espera a que las fuentes (Google Fonts) estén cargadas para que el canvas las use bien.
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }

  const width = svgElement.viewBox.baseVal.width || svgElement.width.baseVal.value;
  const height = svgElement.viewBox.baseVal.height || svgElement.height.baseVal.value;

  const svgString = new XMLSerializer().serializeToString(svgElement);
  const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(svgBlob);

  const img = new Image();
  await new Promise((resolve, reject) => {
    img.onload = resolve;
    img.onerror = reject;
    img.src = url;
  });

  const canvas = document.createElement("canvas");
  canvas.width = width * scale;
  canvas.height = height * scale;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  URL.revokeObjectURL(url);

  canvas.toBlob((blob) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  }, "image/png");
}
