const TestHeader = ({ title, timeLeft, totalDuration }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, "0");

  // % of time remaining
  const progressPercent =
    totalDuration > 0
      ? Math.max(0, (timeLeft / totalDuration) * 100)
      : 0;

  // 🎯 Color logic based on percentage
  const isGreen = progressPercent > 50;
  const isOrange = progressPercent <= 50 && progressPercent > 20;
  const isRed = progressPercent <= 20;

  return (
    <div className="sticky top-0 z-10 bg-white border-b pb-4 mb-6">
      <div className="flex justify-between items-center gap-4">

        {/* Test Title */}
        <div>
          <h1 className="text-lg md:text-xl font-bold text-gray-800">
            {title}
          </h1>
          <p className="text-xs text-gray-400">
            Answer carefully · No back navigation
          </p>
        </div>

        {/* Timer */}
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold tracking-wide
            ${
              isRed
                ? "bg-red-600 text-white animate-pulse"
                : isOrange
                ? "bg-orange-100 text-orange-700"
                : "bg-green-100 text-green-700"
            }
          `}
        >
          <span className="text-lg">⏱</span>
          <span className="tabular-nums">
            {minutes}:{seconds}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000
            ${
              isRed
                ? "bg-red-600"
                : isOrange
                ? "bg-orange-500"
                : "bg-green-500"
            }
          `}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default TestHeader;
