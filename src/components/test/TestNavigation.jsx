const TestNavigation = ({
  isLastQuestion,
  onNext,
  submitting,
}) => {
  return (
    <div className="mt-8 flex justify-between items-center">
      {/* ================= HINT ================= */}
      <p className="text-xs text-white/45">
        {isLastQuestion
          ? "Make sure you have answered carefully"
          : "You cannot go back once you proceed"}
      </p>

      {/* ================= ACTION BUTTON ================= */}
      <button
        onClick={onNext}
        disabled={submitting}
        className={`
          px-8 py-3 rounded-md
          text-sm font-semibold
          bg-transparent
          border
          transition-all duration-200
          ${
            isLastQuestion
              ? "border-red-500/40 text-red-400 hover:border-red-400 hover:text-red-300 hover:shadow-[0_0_14px_rgba(239,68,68,0.25)]"
              : "border-cyan-400/40 text-cyan-300 hover:border-cyan-400 hover:text-cyan-200 hover:shadow-[0_0_14px_rgba(34,211,238,0.25)]"
          }
          disabled:opacity-50
          disabled:cursor-not-allowed
          disabled:hover:shadow-none
        `}
      >
        {submitting
          ? "Submitting…"
          : isLastQuestion
          ? "Submit Test"
          : "Next Question →"}
      </button>
    </div>
  );
};

export default TestNavigation;
