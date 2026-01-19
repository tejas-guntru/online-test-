/**
 * QuestionsForm Component
 *
 * PURPOSE:
 * - Collects all questions for a test DURING CREATION
 * - Allows admin to:
 *   • Enter question text
 *   • (Optional) Add an image URL
 *   • Provide 4 options
 *   • Select exactly ONE correct option
 *
 * IMPORTANT DESIGN RULE:
 * - Questions are editable ONLY at creation time
 * - After test is created, questions become IMMUTABLE
 *
 * USED IN:
 * - Admin.jsx (Step 2: Add Questions)
 */
const QuestionsForm = ({
  questions,
  updateQuestion,
  updateOption,
  onSubmit,
}) => (
  <div className="space-y-8">

    {/* ================= HEADER ================= */}
    <div>
      <h2 className="text-2xl font-semibold">Add Questions</h2>
      <p className="text-sm text-gray-500 mt-1">
        Enter the question, optionally add an image, provide four options,
        and select the correct answer.
      </p>
    </div>

    {/* ================= QUESTIONS LOOP ================= */}
    {questions.map((q, qi) => (
      <div
        key={qi}
        className="bg-white p-6 rounded-xl shadow border space-y-5"
      >
        {/* -------- Question Header -------- */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">
            Question {qi + 1}
          </h3>
          <span className="text-xs text-gray-500">
            Choose one correct option
          </span>
        </div>

        {/* -------- Question Text -------- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question Text
          </label>
          <input
            className="border p-3 w-full rounded"
            placeholder="e.g. What does HTML stand for?"
            value={q.questionText}
            onChange={(e) =>
              updateQuestion(qi, "questionText", e.target.value)
            }
          />
        </div>

        {/* -------- Image URL (NEW) -------- */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL (optional)
          </label>
          <input
            className="border p-3 w-full rounded"
            placeholder="https://example.com/image.png"
            value={q.imageUrl || ""}
            onChange={(e) =>
              updateQuestion(qi, "imageUrl", e.target.value)
            }
          />

          {/* Image preview */}
          {q.imageUrl && (
            <div className="mt-3">
              <img
                src={q.imageUrl}
                alt="Question preview"
                className="max-h-48 rounded border"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}
        </div>

        {/* -------- Options -------- */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Options (select the correct answer)
          </label>

          {q.options.map((opt, oi) => {
            const isCorrect = q.correctOptionIndex === oi;

            return (
              <label
                key={oi}
                className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition ${
                  isCorrect
                    ? "border-green-500 bg-green-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name={`correct-${qi}`}
                  checked={isCorrect}
                  onChange={() =>
                    updateQuestion(qi, "correctOptionIndex", oi)
                  }
                />

                <input
                  className="w-full bg-transparent outline-none"
                  placeholder={`Option ${oi + 1}`}
                  value={opt}
                  onChange={(e) =>
                    updateOption(qi, oi, e.target.value)
                  }
                />

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

    {/* ================= SUBMIT ================= */}
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
