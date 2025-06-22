import jsPDF from "jspdf";
import { NextResponse } from "next/server";

export async function POST(request) {
  const list = await request.json();

  try {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text(
      "Listado de Inscriptos CADA",
      doc.internal.pageSize.getWidth() / 2,
      20,
      { align: "center" }
    );

    // Column positions and widths
    const columns = {
      number: { x: 15, width: 15 },
      nombre: { x: 35, width: 70 },
      categoria: { x: 110, width: 30 },
      pruebas: { x: 145, width: 50 },
    };

    const drawHeaders = (yPos) => {
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");

      doc.text("#", columns.number.x, yPos);
      doc.text("Nombre y Apellido", columns.nombre.x, yPos);
      doc.text("Categoría", columns.categoria.x, yPos);
      doc.text("Pruebas", columns.pruebas.x, yPos);

      // Line under headers
      doc.line(15, yPos + 2, 195, yPos + 2);

      doc.setFont(undefined, "normal");
      return yPos + 8;
    };

    // Sort data
    const sortedInscripciones = list.sort((a, b) => {
      const nombreA = a.atleta || "";
      const nombreB = b.atleta || "";
      return nombreA.localeCompare(nombreB);
    });

    let y = 35;
    y = drawHeaders(y);

    // Add data rows
    doc.setFontSize(9);

    sortedInscripciones.forEach((inscripcion, index) => {
      // Check if we need a new page
      if (y > 270) {
        doc.addPage();
        y = 20;
        y = drawHeaders(y);
      }

      // Convert all values to strings and handle long text
      const numero = (index + 1).toString();
      const atleta = (inscripcion.atleta || "—").toString();
      const categoria = (inscripcion.categoria || "—").toString();
      const pruebas = (inscripcion.pruebas || "—").toString();

      // Handle text wrapping for long names
      const atletaLines = doc.splitTextToSize(atleta, columns.nombre.width);
      const pruebasLines = doc.splitTextToSize(pruebas, columns.pruebas.width);

      // Calculate row height based on wrapped text
      const maxLines = Math.max(atletaLines.length, pruebasLines.length, 1);
      const rowHeight = maxLines * 4;

      // Draw the row
      doc.text(numero, columns.number.x, y);
      doc.text(atletaLines, columns.nombre.x, y);
      doc.text(categoria, columns.categoria.x, y);
      doc.text(pruebasLines, columns.pruebas.x, y);

      y += rowHeight + 2;
    });

    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="listado-inscriptos.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Error generating PDF", details: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
