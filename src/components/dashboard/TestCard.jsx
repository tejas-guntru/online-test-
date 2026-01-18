/**
 * TestCard Component
 *
 * PURPOSE:
 * - Reusable UI card for displaying test information
 * - Used by:
 *   • AvailableTests
 *   • AttemptedTests
 */

const TestCard = ({
  test,
  children,
  leftBorder = false,
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm overflow-hidden transition hover:shadow-md
        ${leftBorder ? "border-l-4 border-blue-500" : ""}
      `}
    >
      {/* Thumbnail */}
      <div className="h-36 bg-gray-100">
        {test.thumbnail ? (
          <img
            src={test.thumbnail}
            alt={test.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
            No Image Available
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800">
          {test.title}
        </h3>

        {/* ✅ Description (FIXED) */}
        <p className="text-sm text-gray-600">
          {test.description || "No description provided for this test."}
        </p>

        {/* Actions */}
        <div className="pt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TestCard;
