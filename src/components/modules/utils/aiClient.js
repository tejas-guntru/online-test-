import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * aiClient.js
 *
 * Gemini generation only
 * Admin evaluates output
 */

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

// ✅ THIS IS THE ONLY STABLE MODEL FOR v1beta
const model = genAI.getGenerativeModel({
  model: "gemini-pro",
});

/* ================= PROMPT BUILDER ================= */

const buildPrompt = ({ text, mode }) => {
  switch (mode) {
    case "summary":
      return `
Summarize the following educational content clearly and concisely.
Do not add opinions.
Return plain text only.

CONTENT:
${text}
`;

    case "title":
      return `
Generate a concise, professional title.
Return ONLY the title.

CONTENT:
${text}
`;

    case "description":
      return `
Write a short module description (2–3 sentences).

CONTENT:
${text}
`;

    default:
      throw new Error("Unsupported AI mode");
  }
};

/* ================= RUN AI ================= */

export const runAI = async ({ text, mode }) => {
  if (!text || text.length < 20) {
    throw new Error("Not enough content for AI");
  }

  try {
    const prompt = buildPrompt({ text, mode });

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    if (!response || !response.trim()) {
      throw new Error("Empty AI response");
    }

    const clean = response.trim();

    if (mode === "summary") return { summary: clean };
    if (mode === "title") return { title: clean };
    if (mode === "description")
      return { description: clean };

    throw new Error("Unhandled AI mode");
  } catch (err) {
    console.error("Gemini AI error:", err);
    throw err;
  }
};
