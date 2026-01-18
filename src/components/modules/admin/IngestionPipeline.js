import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";
import mammoth from "mammoth";

// ✅ Correct worker setup for Vite
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

/**
 * IngestionPipeline
 *
 * - Extracts text from text / pdf / doc
 * - Runs fully client-side
 * - No file storage
 */

export const ingestSource = async (source) => {
  const { sourceType, payload } = source;

  /* ================= TEXT ================= */
  if (sourceType === "text") {
    return {
      sourceType: "text",
      extractedText: payload,
    };
  }

  /* ================= PDF ================= */
  if (sourceType === "pdf") {
    const arrayBuffer = await payload.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      text +=
        content.items.map((item) => item.str).join(" ") +
        "\n";
    }

    return {
      sourceType: "pdf",
      extractedText: text.trim(),
    };
  }

  /* ================= DOC / DOCX ================= */
  if (sourceType === "doc") {
    const arrayBuffer = await payload.arrayBuffer();
    const result = await mammoth.extractRawText({
      arrayBuffer,
    });

    return {
      sourceType: "doc",
      extractedText: result.value.trim(),
    };
  }

  throw new Error("Unsupported source type");
};
