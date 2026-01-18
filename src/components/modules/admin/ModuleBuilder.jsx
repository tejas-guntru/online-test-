import { useState } from "react";
import ModuleMetaEditor from "./ModuleMetaEditor";
import PublishControl from "./PublishControl";

/**
 * STATIC ModuleBuilder
 * - No AI
 * - No file ingestion
 * - Manual content only
 */

const ModuleBuilder = () => {
  const [moduleDraft, setModuleDraft] = useState({
    title: "",
    description: "",
    blocks: [],
    status: "draft",
  });

  const addBlock = () => {
    setModuleDraft((prev) => ({
      ...prev,
      blocks: [
        ...prev.blocks,
        {
          id: Date.now(),
          content: "",
        },
      ],
    }));
  };

  const updateBlock = (id, value) => {
    setModuleDraft((prev) => ({
      ...prev,
      blocks: prev.blocks.map((b) =>
        b.id === id ? { ...b, content: value } : b
      ),
    }));
  };

  const deleteBlock = (id) => {
    setModuleDraft((prev) => ({
      ...prev,
      blocks: prev.blocks.filter((b) => b.id !== id),
    }));
  };

  return (
    <div className="space-y-8">

      {/* MODULE META */}
      <ModuleMetaEditor
        moduleDraft={moduleDraft}
        setModuleDraft={setModuleDraft}
      />

      {/* CONTENT BLOCKS */}
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <h2 className="text-xl font-semibold">
          Content Sections
        </h2>

        {moduleDraft.blocks.map((b, i) => (
          <div
            key={b.id}
            className="border rounded p-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <p className="font-medium">
                Section {i + 1}
              </p>
              <button
                onClick={() => deleteBlock(b.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </div>

            <textarea
              rows={4}
              className="w-full border rounded p-2"
              placeholder="Write content here..."
              value={b.content}
              onChange={(e) =>
                updateBlock(b.id, e.target.value)
              }
            />
          </div>
        ))}

        <button
          onClick={addBlock}
          className="px-4 py-2 border rounded"
        >
          + Add Section
        </button>
      </div>

      {/* SAVE / PUBLISH */}
      <PublishControl
        moduleDraft={moduleDraft}
        setModuleDraft={setModuleDraft}
      />
    </div>
  );
};

export default ModuleBuilder;
