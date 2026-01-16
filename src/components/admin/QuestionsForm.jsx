/**
 * QuestionsForm Component
 *
 * PURPOSE:
 * - Collects all questions for a test DURING CREATION
 * - Allows admin to:
 *   • Enter question text
 *   • Provide 4 options
 *   • Select exactly ONE correct option
 *
 * IMPORTANT DESIGN RULE:
 * - Questions are editable ONLY at creation time
 * - After test is created, questions become IMMUTABLE
 *
 * USED IN:
 * - Admin.jsx (Step 2: Add Questions)
 *
 * PROPS:
 * @param {Array} questions
 *   Array of question objects:
 *   {
 *     questionText: string,
 *     options: string[4],
 *     correctOptionIndex: number
 *   }
 *
 * @param {Function} updateQuestion
 *   Updates a question-level field (text or correct option)
 *
 * @param {Function} updateOption
 *   Updates a specific option inside a question
 *
 * @param {Function} onSubmit
 *   Finalizes test creation and writes data to Firestore
 */
const QuestionsForm = ({
  questions,
  updateQuestion,
  updateOption,
  onSubmit,
}) => (
  <div className="space-y-8">

    {/* ================= HEADER =================
        Explains what admin needs to do on this step */}
    <div>
      <h2 className="text-2xl font-semibold">
        Add Questions
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Enter the question, provide four options, and select the correct answer.
      </p>
    </div>

    {/* ================= QUESTIONS LOOP =================
        Renders one card per question */}
    {questions.map((q, qi) => (
      <div
        key={qi}
        className="bg-white p-6 rounded-xl shadow border"
      >

        {/* -------- Question Header -------- */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">
            Question {qi + 1}
          </h3>
          <span className="text-xs text-gray-500">
            Choose one correct option
          </span>
        </div>

        {/* -------- Question Text Input -------- */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question Text
          </label>
          <input
            className="border p-3 w-full rounded"
            placeholder="e.g. What does HTML stand for?"
            value={q.questionText}
            onChange={(e) =>
              updateQuestion(
                qi,
                "questionText",
                e.target.value
              )
            }
          />
        </div>

        {/* -------- Options Section -------- */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Options (select the correct answer)
          </label>

          {/* Render exactly 4 options */}
          {q.options.map((opt, oi) => {
            const isCorrect =
              q.correctOptionIndex === oi;

            return (
              <label
                key={oi}
                className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition ${
                  isCorrect
                    ? "border-green-500 bg-green-50"
                    : "hover:bg-gray-50"
                }`}
              >
                {/* Radio button for correct answer */}
                <input
                  type="radio"
                  name={`correct-${qi}`}
                  checked={isCorrect}
                  onChange={() =>
                    updateQuestion(
                      qi,
                      "correctOptionIndex",
                      oi
                    )
                  }
                />

                {/* Option text input */}
                <input
                  className="w-full bg-transparent outline-none"
                  placeholder={`Option ${oi + 1}`}
                  value={opt}
                  onChange={(e) =>
                    updateOption(
                      qi,
                      oi,
                      e.target.value
                    )
                  }
                />

                {/* Correct badge */}
                {isCorrect && (
                  <span className="text-xs text-green-600 font-medium">
                    Correct
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>
    ))}

    {/* ================= SUBMIT =================
        Finalizes test creation and persists data */}
    <div className="pt-4">
      <button
        onClick={onSubmit}
        className="bg-green-600 text-white px-12 py-3 rounded-xl hover:bg-green-700 transition text-lg"
      >
        Create Test
      </button>
    </div>
  </div>
);

export default QuestionsForm;
