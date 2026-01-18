/**
 * ModuleMetaEditor
 *
 * PURPOSE:
 * - Edit title & description of a module
 * - MUST remain controlled at all times
 *
 * FIX APPLIED:
 * - Inputs NEVER receive undefined
 * - Uses empty string fallback ("")
 */

const ModuleMetaEditor = ({
  moduleDraft,
  setModuleDraft,
  disabled,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">
        Module Details
      </h2>

      {/* ================= TITLE ================= */}
      <div>
        <label className="text-sm font-medium">
          Title
        </label>
        <input
          disabled={disabled}
          className="w-full border rounded p-3 disabled:bg-gray-100"
          value={moduleDraft.title || ""}
          onChange={(e) =>
            setModuleDraft((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />
      </div>

      {/* ================= DESCRIPTION ================= */}
      <div>
        <label className="text-sm font-medium">
          Description
        </label>
        <textarea
          disabled={disabled}
          rows={3}
          className="w-full border rounded p-3 disabled:bg-gray-100"
          value={moduleDraft.description || ""}
          onChange={(e) =>
            setModuleDraft((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </div>

      {/* ================= LOCK INFO ================= */}
      {disabled && (
        <p className="text-xs text-gray-500">
          This module is published and cannot be edited.
        </p>
      )}
    </div>
  );
};

export default ModuleMetaEditor;
