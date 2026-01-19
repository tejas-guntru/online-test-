/**
 * TestCard Component – Fixed Height, Image-Optimized
 *
 * Image priority:
 * 1. test.previewImage
 * 2. test.thumbnail
 * 3. fallback UI
 */

const TestCard = ({
  test,
  children,
  leftBorder = false,
}) => {
  const previewImage = test.previewImage || test.thumbnail || null;

  return (
    <div
      className={`
        bg-white border border-gray-200 rounded-lg
        flex flex-col
        h-[420px] max-h-[420px]
        transition-shadow duration-150
        hover:shadow-md
        ${leftBorder ? "border-l-4 border-blue-600" : ""}
      `}
    >
      {/* ================= IMAGE (MORE SPACE) ================= */}
      <div className="h-44 bg-gray-100 border-b shrink-0 overflow-hidden rounded-t-lg">
        {previewImage ? (
          <img
            src={previewImage}
            alt={test.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
            No preview available
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-col flex-1 px-4 py-4">

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 min-h-[3rem]">
          {test.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-600 leading-relaxed line-clamp-3 min-h-[4.5rem]">
          {test.description || "No description provided for this assessment."}
        </p>

        {/* Push actions down */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="border-t pt-3">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TestCard;
