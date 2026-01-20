const TestHeader = ({ title, timeLeft, totalDuration }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const progressPercent =
    totalDuration > 0
      ? Math.max(0, (timeLeft / totalDuration) * 100)
      : 0;

  const isGreen = progressPercent > 50;
  const isOrange = progressPercent <= 50 && progressPercent > 20;
  const isRed = progressPercent <= 20;

  return (
    <div className="sticky top-0 z-10 mb-6 bg-[#020617]/95 backdrop-blur border-b border-white/5 pb-4">
      <div className="flex justify-between items-center gap-4">
        {/* ================= TITLE ================= */}
        <div>
          <h1 className="text-lg md:text-xl font-semibold text-white/90">
            {title}
          </h1>
          <p className="text-xs text-white/45">
            Answer carefully · No back navigation
          </p>
        </div>

        {/* ================= TIMER ================= */}
        <div
          className={`
            flex items-center gap-2
            px-4 py-2 rounded-md
            font-semibold tracking-wide
            tabular-nums
            ${
              isRed
                ? "border border-red-500/50 text-red-400 animate-pulse bg-red-500/10"
                : isOrange
                ? "border border-orange-400/40 text-orange-300 bg-orange-400/10"
                : "border border-cyan-400/40 text-cyan-300 bg-cyan-400/10"
            }
          `}
        >
          <span className="text-base">⏱</span>
          <span>
            {minutes}:{seconds}
          </span>
        </div>
      </div>

      {/* ================= PROGRESS BAR ================= */}
      <div className="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className={`
            h-full transition-all duration-1000
            ${
              isRed
                ? "bg-red-500"
                : isOrange
                ? "bg-orange-400"
                : "bg-cyan-400"
            }
          `}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};

export default TestHeader;
