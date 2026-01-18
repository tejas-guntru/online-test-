/**
 * Client-side text extraction
 * IMPORTANT:
 * - No storage
 * - No Firestore
 * - No backend
 * - Memory only
 */

export const extractText = async (input) => {
  // CASE 1: Plain text / single word / bulk pasted data
  if (typeof input === "string") {
    return input.trim();
  }

  // CASE 2: File upload
  if (input instanceof File) {
    const ext = input.name.split(".").pop().toLowerCase();

    // --- PDF (text-based PDFs only) ---
    if (ext === "pdf") {
      // TEMP PLACEHOLDER
      // Later you can plug pdfjs-dist here
      return "[PDF text extracted temporarily]";
    }

    // --- DOC / DOCX ---
    if (ext === "doc" || ext === "docx") {
      // TEMP PLACEHOLDER
      // Later you can plug mammoth.js here
      return "[DOC text extracted temporarily]";
    }

    // --- CSV / TXT ---
    if (ext === "csv" || ext === "txt") {
      const text = await input.text();
      return text;
    }

    return "";
  }

  return "";
};
