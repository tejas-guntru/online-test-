const PublishModuleModal = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow">
      <h3 className="text-lg font-semibold">
        Publish Module
      </h3>

      <p className="text-sm text-gray-600 mt-2">
        Once published, this module cannot be edited.
      </p>

      <div className="mt-4 flex gap-3">
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Publish
        </button>
        <button className="border px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PublishModuleModal;
