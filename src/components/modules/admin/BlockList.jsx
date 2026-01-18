import { runAI } from "../utils/aiClient";
import { useState } from "react";

/**
 * BlockList
 *
 * - Shows ingested blocks
 * - Allows admin to explicitly trigger AI
 * - Preserves trust & control
 */

const BlockList = ({ blocks, setModuleDraft, disabled }) => {
  const [loadingId, setLoadingId] = useState(null);

  const deleteBlock = (id) => {
    if (disabled) return;

    setModuleDraft((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((b) => b.id !== id),
    }));
  };

  const generateAI = async (block) => {
    if (disabled || !block.rawText) return;

    setLoadingId(block.id);

    try {
      const res = await runAI({
        text: block.rawText,
        mode: "summary",
      });

      setModuleDraft((prev) => ({
        ...prev,
        blocks: prev.blocks.map((b) =>
          b.id === block.id
            ? {
                ...b,
                summary: res.summary,
                aiGenerated: true,
              }
            : b
        ),
      }));
    } catch (e) {
      alert("AI failed to generate summary");
    }

    setLoadingId(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Content Blocks
      </h2>

      {blocks.length === 0 && (
        <p className="text-sm text-gray-500">
          No content blocks added yet.
        </p>
      )}

      <div className="space-y-4">
        {blocks.map((b) => (
          <div
            key={b.id}
            className="border p-4 rounded space-y-2"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium">
                Source:{" "}
                <span className="uppercase">
                  {b.sourceType}
                </span>
              </p>

              {!disabled && (
                <button
                  onClick={() => deleteBlock(b.id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              )}
            </div>

            {/* SUMMARY */}
            <textarea
              disabled={disabled}
              rows={3}
              className="w-full border rounded p-2 disabled:bg-gray-100"
              placeholder="AI summary will appear here"
              value={b.summary || ""}
              onChange={(e) =>
                setModuleDraft((prev) => ({
                  ...prev,
                  blocks: prev.blocks.map((blk) =>
                    blk.id === b.id
                      ? {
                          ...blk,
                          summary: e.target.value,
                        }
                      : blk
                  ),
                }))
              }
            />

            {/* ACTIONS */}
            {!disabled && (
              <div className="flex gap-3 items-center">
                <button
                  onClick={() => generateAI(b)}
                  disabled={
                    loadingId === b.id || !b.rawText
                  }
                  className="px-3 py-1 border rounded text-sm disabled:bg-gray-200"
                >
                  {loadingId === b.id
                    ? "Generating…"
                    : b.aiGenerated
                    ? "Improve with AI"
                    : "Generate with AI"}
                </button>

                {b.aiGenerated && (
                  <span className="text-xs text-green-600">
                    AI generated
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockList;
