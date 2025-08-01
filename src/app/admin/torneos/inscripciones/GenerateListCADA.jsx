"use client";

import * as XLSX from "xlsx/xlsx.mjs";
import { useEffect, useState } from "react";
import axios from "axios";

const extractDataFromFile = async (file) => {
  try {
    const data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsArrayBuffer(file);
    });

    const workbook = XLSX.read(data, { type: "array", codepage: 28591 });

    // Get the first worksheet
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];

    // Convert to JSON starting from row 2 (index 1)
    const jsonFile = XLSX.utils.sheet_to_json(worksheet, {
      range: 1,
      defval: "",
    });

    return jsonFile;
  } catch (error) {
    console.error("Error processing file:", error);
    throw error;
  }
};

// New function to extract headers from the original file
const extractHeadersFromFile = async (file) => {
  try {
    const data = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsBinaryString(file);
    });

    const workbook = XLSX.read(data, { type: "binary" });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];

    // Get headers from the first row
    const headers = XLSX.utils.sheet_to_json(worksheet, {
      range: 0, // Start from row 1 (headers)
      header: 1, // Use first row as headers
    });

    // Extract the keys from the second row to get column order
    if (headers.length > 0) {
      return headers[1];
    }
    return [];
  } catch (error) {
    console.error("Error extracting headers:", error);
    return [];
  }
};

const generateList = async (data) => {
  try {
    // Make array of arrays just one array
    data = data.flat(1);

    const uniqueAthletes = new Map();

    data.forEach((athlete) => {
      const key = `${athlete["DOCUMENTO"]}`;

      if (!uniqueAthletes.has(key)) {
        const pruebas = data.filter(
          (item) => item["DOCUMENTO"] === athlete["DOCUMENTO"]
        );

        if (pruebas.length > 1) {
          const pruebasList = pruebas.map((item) => item["PRUEBA"]).join(", ");
          athlete["PRUEBA"] = pruebasList;
        } else {
          athlete["PRUEBA"] = athlete["PRUEBA"] || "";
        }

        uniqueAthletes.set(key, {
          atleta: athlete["APELLIDO_Y_NOMBRE"],
          categoria: athlete["CATEGORIA"],
          pruebas: athlete["PRUEBA"],
        });
      }
    });

    const list = Array.from(uniqueAthletes.values());

    // Configure axios to handle binary data
    const response = await axios.post(`/api/pdf`, list, {
      responseType: "blob", // Important: tell axios to expect binary data
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Create blob and download
    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    // Create temporary link and trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = "listado-inscriptos-cada.pdf";
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    return true; // Return success indicator
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};

const listPdf = async (files) => {
  const arrayFiles = Array.from(files);
  const filesData = await Promise.all(
    arrayFiles.map(async (file) => await extractDataFromFile(file))
  );

  return await generateList(filesData);
};
const generateUniqueAthletesWithNumber = (
  filesData,
  startNumber,
  nameHeader
) => {
  const uniqueAthletes = new Map();
  let index = startNumber;

  filesData.flat(1).forEach((athlete) => {
    const key = athlete["DOCUMENTO"] || athlete["documento"];
    if (!uniqueAthletes.has(key)) {
      const name = athlete[nameHeader] || athlete["APELLIDO_Y_NOMBRE"] || "";
      if (!name) {
        console.warn(
          "Athlete name is missing for document:",
          athlete["DOCUMENTO"]
        );
        return; // Skip if name is missing
      }
      uniqueAthletes.set(key, {
        number: index,
        name: name.trim(),
      });
      index++;
    }
  });

  return uniqueAthletes;
};
const generateNumbers = async (files, startNumber) => {
  // Extract headers from the first file to preserve column order
  const arrayFiles = Array.from(files);
  const headers = await extractHeadersFromFile(arrayFiles[0]);
  const nameHeader = headers.find((header) =>
    header.toUpperCase().includes("APELLIDO_Y_NOMBRE")
  );
  const filesData = await Promise.all(
    arrayFiles.map(async (file) => await extractDataFromFile(file))
  );

  const uniqueAthletes = generateUniqueAthletesWithNumber(
    filesData,
    startNumber,
    nameHeader
  );
  return uniqueAthletes;
};

const listInscriptions = async (files, addNumber, startNumber) => {
  const arrayFiles = Array.from(files);

  // Extract headers from the first file to preserve column order
  const headers = await extractHeadersFromFile(arrayFiles[0]);

  const filesData = await Promise.all(
    arrayFiles.map(async (file) => await extractDataFromFile(file))
  );

  // Create an empty row object with all headers as empty strings
  const emptyRow = {};
  headers.forEach((header) => {
    emptyRow[header] = "";
  });

  // Add empty row at the beginning of the data
  const dataWithEmptyRow = [emptyRow, ...filesData.flat(1)];
  let dataWithNumbers = dataWithEmptyRow;
  if (addNumber) {
    const uniqueAthletes = await generateNumbers(files, startNumber);
    dataWithNumbers = dataWithEmptyRow.map((athlete) => {
      const key = athlete["DOCUMENTO"] || athlete["documento"];
      const numberHeader = headers.find((header) =>
        header.toUpperCase().includes("NUMERO")
      );
      if (uniqueAthletes.has(key)) {
        return {
          ...athlete,
          [numberHeader]: uniqueAthletes.get(key).number,
        };
      }
      return athlete;
    });
  }

  const workbook = XLSX.utils.book_new();

  // Use the extracted headers to maintain column order
  const worksheet = XLSX.utils.json_to_sheet(dataWithNumbers, {
    header: headers,
  });

  const columnWidths = [
    { wch: 15 },
    { wch: 8 },
    { wch: 20 },
    { wch: 25 },
    { wch: 12 },
    { wch: 12 },
    { wch: 5 },
    { wch: 5 },
    { wch: 6 },
    { wch: 12 },
    { wch: 3 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
  ];

  worksheet["!cols"] = columnWidths;

  XLSX.utils.book_append_sheet(workbook, worksheet, "Inscripciones CADA");

  const xlsBuffer = XLSX.write(workbook, {
    type: "array",
    bookType: "xls",
  });

  const blob = new Blob([xlsBuffer], {
    type: "application/vnd.ms-excel",
  });

  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "inscripciones-cada.xls";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);

  return true;
};

const GenerateListCADA = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [action, setAction] = useState(null);
  const [startNumber, setStartNumber] = useState(1);

  useEffect(() => {
    if (files.length > 0) {
      handleFileProcessing();
    }
  }, [files]);

  const generateNumbersPdf = async (files) => {
    const uniqueAthletes = await generateNumbers(files, startNumber);
    // Dynamic import for client-side only
    const { jsPDF } = await import("jspdf");

    const pdf = new jsPDF("landscape");
    const athletes = Array.from(uniqueAthletes.entries());

    athletes.forEach(([dni, athlete], index) => {
      if (index > 0) {
        pdf.addPage();
      }

      // Set up the page
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Draw number (very large)
      pdf.setFontSize(300);
      pdf.setFont("helvetica", "bold");
      const numberText = athlete.number.toString();
      const numberWidth = pdf.getTextWidth(numberText);
      pdf.text(numberText, (pageWidth - numberWidth) / 2, pageHeight / 2 + 20);

      // Draw name (medium size)
      pdf.setFontSize(28);
      pdf.setFont("helvetica", "normal");
      const upperCaseName = athlete.name.toUpperCase();
      const nameLines = pdf.splitTextToSize(upperCaseName, pageWidth - 40);
      pdf.text(
        nameLines,
        (pageWidth - pdf.getTextWidth(upperCaseName)) / 2,
        pageHeight / 2 + 60
      );

      // Draw a border
      pdf.setLineWidth(2);
      pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);
    });

    pdf.save("numeros-atletas.pdf");
  };
  const handleFileProcessing = async () => {
    setIsLoading(true);
    setError(null);

    try {
      switch (action) {
        case "listado":
          await listPdf(files);
          break;
        case "inscripcion":
          await listInscriptions(files);
          break;
        case "numeros":
          await generateNumbersPdf(files); // Assuming start number is 1 for simplicity
          await listInscriptions(files, true, startNumber);
          break;
        default:
          break;
      }

      // Reset files after successful processing
      setFiles([]);
      setAction(null);
    } catch (err) {
      setError("Error processing files: " + err.message);
      console.error("File processing error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <p>
        Al subir las inscripciones de CADA, se puede generar el listado de
        atletas o un solo archivo de inscripciones
      </p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
          Procesando archivos y generando PDF...
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="listado-input" className="">
          Generar listado CADA
        </label>
        <input
          id="listado-input"
          type="file"
          multiple
          accept=".xls"
          disabled={isLoading}
          onChange={(e) => {
            setAction("listado");
            setFiles(e.target.files);
          }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="inscripciones-input" className="">
          Generar inscripciones CADA
        </label>
        <input
          id="inscripciones-input"
          type="file"
          accept=".xls"
          multiple
          disabled={isLoading}
          onChange={(e) => {
            setAction("inscripcion");
            setFiles(e.target.files);
          }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="inscripciones-input" className="">
          Generar Números de Atletas
        </label>
        <input
          id="inscripciones-input"
          type="file"
          accept=".xls"
          disabled={isLoading}
          onChange={(e) => {
            setAction("numeros");
            setFiles(e.target.files);
          }}
        />
        <label htmlFor="start-number" className="">
          Número de inicio
        </label>
        <input
          type="number"
          id="start-number"
          min="1"
          value={startNumber}
          onChange={(e) => setStartNumber(Number(e.target.value))}
          placeholder="Número de inicio"
          className="mt-2 p-2 border rounded"
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default GenerateListCADA;
