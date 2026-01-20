/**
 * TestCard Component – Fixed Height, Image-Optimized
 *
 * Dark Neon Dashboard styling
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
        flex flex-col
        h-[420px] max-h-[420px]
        rounded-xl
        bg-[#020617]
        border border-white/5
        transition-all duration-200
        hover:shadow-[0_12px_30px_rgba(0,0,0,0.45)]
        ${leftBorder ? "border-l-4 border-cyan-400/60" : ""}
      `}
    >
      {/* ================= IMAGE ================= */}
      <div className="h-44 shrink-0 overflow-hidden rounded-t-xl bg-black/40 border-b border-white/5">
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
          <div className="w-full h-full flex items-center justify-center text-white/40 text-xs">
            No preview available
          </div>
        )}
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex flex-col flex-1 px-4 py-4">
        {/* Title */}
        <h3 className="text-base font-semibold text-white/90 line-clamp-2 min-h-[3rem]">
          {test.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-white/60 leading-relaxed line-clamp-3 min-h-[4.5rem]">
          {test.description ||
            "No description provided for this assessment."}
        </p>

        {/* Push actions down */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="pt-3 border-t border-white/5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default TestCard;
