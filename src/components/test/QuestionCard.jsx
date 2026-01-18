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
      {/* Progress */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Question {questionNumber} of {totalQuestions}
        </p>

        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
          Single correct
        </span>
      </div>

      {/* Question */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-base font-semibold text-gray-800 leading-relaxed">
          {question.questionText}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;

          return (
            <button
              key={index}
              type="button"
              onClick={() => onSelectOption(index)}
              className={`w-full text-left flex items-center gap-4 p-4 rounded-lg border transition-all
                ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 ring-2 ring-blue-200"
                    : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                }
              `}
            >
              {/* Option letter */}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border font-semibold
                  ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-600 border-gray-400"
                  }
                `}
              >
                {String.fromCharCode(65 + index)}
              </div>

              {/* Option text */}
              <span className="text-gray-800">
                {option}
              </span>
            </button>
          );
        })}
      </div>

      {/* Hint */}
      <p className="text-xs text-gray-400 text-center">
        Select an option and press <span className="font-medium">Next</span> or <span className="font-medium">Enter</span>
      </p>
    </div>
  );
};

export default QuestionCard;
