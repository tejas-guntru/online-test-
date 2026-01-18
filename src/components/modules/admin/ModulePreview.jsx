const ModulePreview = ({ moduleDraft }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-xl border">
      <h2 className="text-2xl font-semibold">
        {moduleDraft.title || "Untitled Module"}
      </h2>

      <p className="text-gray-600 mt-2">
        {moduleDraft.description || "No description yet"}
      </p>

      <div className="mt-4 space-y-2">
        <p>⏱ Duration: {moduleDraft.assessment.durationMinutes} min</p>
        <p>🎯 Total Marks: {moduleDraft.assessment.totalMarks}</p>
      </div>

      <div className="mt-6 space-y-2">
        {moduleDraft.blocks.map((b) => (
          <div key={b.id} className="border p-3 rounded bg-white">
            {b.summary}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulePreview;
