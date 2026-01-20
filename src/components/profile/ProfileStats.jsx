/**
 * ProfileStats Component
 *
 * Displays aggregate performance statistics
 */
const ProfileStats = ({
  totalTests,
  avgPercentage,
  totalScore,
}) => {
  return (
    /* ==================== STATS GRID ==================== */
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <StatBox label="Tests Attempted" value={totalTests} />
      <StatBox label="Average Score" value={`${avgPercentage}%`} />
      <StatBox label="Total Score" value={totalScore} />
    </div>
  );
};

/**
 * StatBox Component
 *
 * Displays a single metric
 */
const StatBox = ({ label, value }) => (
  <div
    className="
      rounded-xl p-5
      bg-[#020617]
      border border-white/5
      text-center
      shadow-[0_10px_30px_rgba(0,0,0,0.4)]
      transition
      hover:border-cyan-400/40
    "
  >
    <p className="text-sm text-white/55 mb-1">
      {label}
    </p>

    <p className="text-3xl font-semibold text-white/90">
      {value}
    </p>
  </div>
);

export default ProfileStats;
