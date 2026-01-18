const ModuleCard = ({ module }) => {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      <h3 className="font-semibold text-lg">
        {module.title}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        Status: {module.status}
      </p>

      <div className="mt-4 flex gap-2">
        <button className="text-blue-600 text-sm">
          Edit
        </button>
        <button className="text-gray-600 text-sm">
          Preview
        </button>
      </div>
    </div>
  );
};

export default ModuleCard;
