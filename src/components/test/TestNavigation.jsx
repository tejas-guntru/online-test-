const TestNavigation = ({
  isLastQuestion,
  onNext,
  submitting,
}) => {
  return (
    <div className="mt-8 flex justify-between items-center">

      {/* Hint */}
      <p className="text-xs text-gray-400">
        {isLastQuestion
          ? "Make sure you have answered carefully"
          : "You cannot go back once you proceed"}
      </p>

      {/* Action Button */}
      <button
        onClick={onNext}
        disabled={submitting}
        className={`px-8 py-3 rounded-lg font-semibold transition-all
          ${
            isLastQuestion
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {submitting
          ? "Submitting..."
          : isLastQuestion
          ? "Submit Test"
          : "Next Question →"}
      </button>
    </div>
  );
};

export default TestNavigation;
