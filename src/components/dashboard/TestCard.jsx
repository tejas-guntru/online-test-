const TestCard = ({
  test,
  children,
  leftBorder = false,
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow overflow-hidden ${
        leftBorder ? "border-l-4 border-blue-500" : ""
      }`}
    >
      {/* Thumbnail */}
      <div className="h-36 bg-gray-200">
        {test.thumbnail ? (
          <img
            src={test.thumbnail}
            alt={test.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold mb-1">
          {test.title}
        </h3>

        <p className="text-sm text-gray-600 mb-3">
          {test.description || "No description"}
        </p>

        {children}
      </div>
    </div>
  );
};

export default TestCard;
