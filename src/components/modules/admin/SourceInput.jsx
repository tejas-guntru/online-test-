/**
 * SourceInput
 *
 * PURPOSE:
 * - Accepts different source types (text / pdf / doc)
 * - Does NOT store files
 * - Emits a "source descriptor" only
 */

const SourceInput = ({ onIngest, disabled }) => {
  const handleText = (e) => {
    if (disabled) return;

    const value = e.target.value.trim();
    if (!value) return;

    onIngest({
      sourceType: "text",
      payload: value,
    });

    e.target.value = "";
  };

  const handleFile = (e, type) => {
    if (disabled) return;

    const file = e.target.files[0];
    if (!file) return;

    onIngest({
      sourceType: type,
      payload: file,
    });

    e.target.value = null;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">
        Add Source
      </h2>

      {/* TEXT INPUT */}
      <textarea
        disabled={disabled}
        rows={3}
        className="w-full border rounded p-3 disabled:bg-gray-100"
        placeholder="Paste text or notes here"
        onBlur={handleText}
      />

      {/* FILE INPUTS */}
      <div className="flex gap-4">
        <label className="border px-4 py-2 rounded cursor-pointer">
          Upload PDF
          <input
            type="file"
            accept=".pdf"
            hidden
            onChange={(e) =>
              handleFile(e, "pdf")
            }
          />
        </label>

        <label className="border px-4 py-2 rounded cursor-pointer">
          Upload DOC
          <input
            type="file"
            accept=".doc,.docx"
            hidden
            onChange={(e) =>
              handleFile(e, "doc")
            }
          />
        </label>
      </div>

      <p className="text-xs text-gray-500">
        Files are processed locally and never stored.
      </p>
    </div>
  );
};

export default SourceInput;
