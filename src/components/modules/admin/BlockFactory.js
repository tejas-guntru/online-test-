export const createBlockFromIngestion = (ingestion) => {
  return {
    id: Date.now(),
    sourceType: ingestion.sourceType,
    rawText: ingestion.extractedText || null, // TEMP ONLY
    summary: "",
    aiGenerated: false,
  };
};
