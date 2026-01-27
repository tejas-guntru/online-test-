const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedOption,
  onSelectOption,
}) => {
  if (!question) return null;

  return (
    <div className="space-y-6">
      {/* ================= PROGRESS ================= */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-white/55">
          Question {questionNumber} of {totalQuestions}
        </p>

        <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-white/60 border border-white/10">
          Single correct
        </span>
      </div>

      {/* ================= QUESTION ================= */}
      <div className="rounded-xl p-5 bg-black/30 border border-white/5 space-y-4">
        <p className="text-base font-medium text-white/90 leading-relaxed">
          {question.questionText}
        </p>

        {/* OPTIONAL QUESTION IMAGE */}
        {question.imageUrl && (
          <div className="flex justify-center">
            <img
              src={question.imageUrl}
              alt="Question illustration"
              className="max-h-64 rounded-lg border border-white/10 object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}
      </div>

      {/* ================= OPTIONS (SHUFFLED, INDEX-SAFE) ================= */}
      <div className="space-y-3">
        {question.shuffledOptions.map((option, shuffledIndex) => {
          const isSelected =
            selectedOption?.shuffledIndex === shuffledIndex;

          return (
            <button
              key={shuffledIndex}
              type="button"
              onClick={() =>
                onSelectOption({
                  value: option,
                  shuffledIndex,
                })
              }
              className={`
                w-full text-left
                flex items-center gap-4
                p-4 rounded-lg
                border transition-all duration-150
                ${
                  isSelected
                    ? "border-cyan-400/60 bg-cyan-500/5 shadow-[0_0_0_1px_rgba(34,211,238,0.25)]"
                    : "border-white/10 bg-black/20 hover:border-white/20 hover:bg-black/30"
                }
              `}
            >
              {/* Option letter */}
              <div
                className={`
                  flex items-center justify-center
                  w-8 h-8 rounded-full
                  border font-semibold text-sm
                  ${
                    isSelected
                      ? "border-cyan-400 bg-cyan-500/20 text-cyan-300"
                      : "border-white/20 text-white/60"
                  }
                `}
              >
                {String.fromCharCode(65 + shuffledIndex)}
              </div>

              {/* Option text */}
              <span
                className={`${
                  isSelected
                    ? "text-white/90"
                    : "text-white/70"
                }`}
              >
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {/* ================= HINT ================= */}
      <p className="text-xs text-white/40 text-center">
        Select an option and press{" "}
        <span className="text-white/60 font-medium">Next</span>{" "}
        or{" "}
        <span className="text-white/60 font-medium">Enter</span>
      </p>
    </div>
  );
};

export default QuestionCard;
