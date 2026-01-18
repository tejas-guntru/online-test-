const ModuleHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">
        Learning Modules
      </h1>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        + Create Module
      </button>
    </div>
  );
};

export default ModuleHeader;
