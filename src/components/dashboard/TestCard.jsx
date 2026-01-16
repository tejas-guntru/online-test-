/**
 * TestCard Component
 *
 * PURPOSE:
 * - Acts as a reusable UI card for displaying test information
 * - Used by:
 *   • AvailableTests
 *   • AttemptedTests
 *
 * DESIGN GOALS:
 * - Consistent UI for all test cards
 * - Supports optional banner/thumbnail
 * - Allows flexible content via `children`
 *
 * PROPS:
 * @param {Object} test        - Test data (title, description, thumbnail, etc.)
 * @param {ReactNode} children - Action buttons / extra info (Start, Score, etc.)
 * @param {boolean} leftBorder - Visual indicator (used for attempted tests)
 */
const TestCard = ({
  test,
  children,
  leftBorder = false,
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow overflow-hidden ${
        // Adds a colored left border if enabled
        leftBorder ? "border-l-4 border-blue-500" : ""
      }`}
    >
      {/* ================= TEST THUMBNAIL / BANNER =================
          Displays a test image if available, otherwise shows a fallback */}
      <div className="h-36 bg-gray-200">
        {test.thumbnail ? (
          <img
            src={test.thumbnail}
            alt={test.title}
            className="w-full h-full object-cover"
          />
        ) : (
          // Fallback UI when no image is provided
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* ================= CARD CONTENT ================= */}
      <div className="p-5">
        
        {/* Test Title */}
        <h3 className="text-lg font-semibold mb-1">
          {test.title}
        </h3>

        {/* Test Description */}
        <p className="text-sm text-gray-600 mb-3">
          {test.description || "No description"}
        </p>

        {/* ================= EXTENSIBLE AREA =================
            Allows parent components to inject:
            - Start button
            - Score / Percentage
            - Status badges
            - Certificate actions */}
        {children}
      </div>
    </div>
  );
};

export default TestCard;
