import { useState } from "react";
import { runAI } from "../utils/aiClient";

const AIActions = ({ moduleDraft, setModuleDraft, disabled }) => {
  const [loading, setLoading] = useState(null);

  const combinedText = moduleDraft.blocks
    .map((b) => b.summary)
    .join("\n");

  const improveTitle = async () => {
    if (disabled) return;
    setLoading("title");

    try {
      const res = await runAI({
        text: combinedText,
        mode: "title",
      });

      setModuleDraft((prev) => ({
        ...prev,
        title: res.title || prev.title,
      }));
    } catch (e) {
      alert(e.message);
    }

    setLoading(null);
  };

  const improveDescription = async () => {
    if (disabled) return;
    setLoading("description");

    try {
      const res = await runAI({
        text: combinedText,
        mode: "description",
      });

      setModuleDraft((prev) => ({
        ...prev,
        description:
          res.description || prev.description,
      }));
    } catch (e) {
      alert(e.message);
    }

    setLoading(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-3">
        AI Assistance
      </h2>

      <div className="flex gap-3">
        <button
          disabled={disabled || loading}
          onClick={improveTitle}
          className="border px-4 py-2 rounded disabled:bg-gray-200"
        >
          {loading === "title"
            ? "Improving…"
            : "Improve Title"}
        </button>

        <button
          disabled={disabled || loading}
          onClick={improveDescription}
          className="border px-4 py-2 rounded disabled:bg-gray-200"
        >
          {loading === "description"
            ? "Improving…"
            : "Improve Description"}
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-3">
        AI suggestions are optional and editable.
      </p>
    </div>
  );
};

export default AIActions;
