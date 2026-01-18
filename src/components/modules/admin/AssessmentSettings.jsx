const AssessmentSettings = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4">
        Assessment Settings
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="number"
          placeholder="Total Marks"
          className="border p-3 rounded"
        />

        <input
          type="number"
          placeholder="Duration (minutes)"
          className="border p-3 rounded"
        />
      </div>
    </div>
  );
};

export default AssessmentSettings;
