const StepIndicator = ({ step }) => (
  <div className="flex gap-4">
    {["Test Info", "Questions"].map((label, i) => (
      <span
        key={i}
        className={`px-4 py-1 rounded-full text-sm font-medium ${
          step === i + 1
            ? "bg-blue-600 text-white"
            : "bg-gray-300"
        }`}
      >
        Step {i + 1}: {label}
      </span>
    ))}
  </div>
);

export default StepIndicator;
