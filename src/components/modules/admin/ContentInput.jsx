import { useState } from "react";
import { extractText } from "../utils/extractText.client";
import { runAI } from "../utils/aiClient";

const MIN_AI_LENGTH = 5;

const ContentInput = ({ moduleDraft, setModuleDraft, disabled }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleText = async (value) => {
    if (disabled) return;

    const trimmed = value.trim();

    // ❌ No empty or tiny input
    if (trimmed.length < MIN_AI_LENGTH) {
      setError(
        "Add more content so AI can understand it (at least a sentence)."
      );
      return;
    }

    setLoading(true);
    setError("");

    try {
      // 1️⃣ Extract text (client-side, temporary)
      const extracted = await extractText(trimmed);

      // 2️⃣ AI understands ONCE
      const ai = await runAI({
        text: extracted,
        mode: "summary",
      });

      // 3️⃣ Store ONLY AI output (safe)
      setModuleDraft((prev) => ({
        ...prev,
        title: prev.title || ai.title,
        description: prev.description || ai.description,
        blocks: [
          ...prev.blocks,
          {
            id: Date.now(),
            kind: "text",
            summary: ai.summary,
          },
        ],
      }));
    } catch (err) {
      // ✅ Graceful handling (NO crash)
      setError(
        err.message || "AI could not understand the content."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-3">
        Add Content
      </h2>

      <textarea
        disabled={disabled}
        rows={4}
        className="w-full border rounded p-3 disabled:bg-gray-100"
        placeholder={
          disabled
            ? "Module is published and locked"
            : "Paste text, single word, or bulk data..."
        }
        onBlur={(e) => handleText(e.target.value)}
      />

      {/* LOADING */}
      {loading && (
        <p className="text-sm text-gray-500 mt-2">
          AI is understanding the content…
        </p>
      )}

      {/* ERROR MESSAGE */}
      {error && (
        <p className="text-sm text-red-600 mt-2">
          {error}
        </p>
      )}
    </div>
  );
};

export default ContentInput;
