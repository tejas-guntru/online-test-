/**
 * StepIndicator Component
 *
 * PURPOSE:
 * - Visually indicates the CURRENT step in the admin test-creation flow
 * - Helps admins understand where they are in the process
 *
 * USED IN:
 * - Admin.jsx
 *
 * CURRENT FLOW:
 * Step 1 → Test Info
 * Step 2 → Questions
 *
 * PROPS:
 * @param {number} step
 *   The current step number (1-based index)
 */
const StepIndicator = ({ step }) => (
  <div className="flex gap-4">

    {/* Loop through step labels and render pills */}
    {["Test Info", "Questions"].map((label, i) => (
      <span
        key={i}

        /*
         * ACTIVE STEP:
         * - Highlighted in blue
         * - White text for emphasis
         *
         * INACTIVE STEP:
         * - Gray background
         */
        className={`px-4 py-1 rounded-full text-sm font-medium ${
          step === i + 1
            ? "bg-blue-600 text-white"
            : "bg-gray-300"
        }`}
      >
        {/* Display step number and label */}
        Step {i + 1}: {label}
      </span>
    ))}
  </div>
);

export default StepIndicator;
