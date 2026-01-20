/**
 * ProfileAnalytics Component
 *
 * Displays high-level user performance analytics
 */
const ProfileAnalytics = ({ results }) => {
  const total = results.length;

  const passed = results.filter(
    (r) => (r.score / r.total) * 100 >= 40
  ).length;

  const failed = total - passed;

  return (
    /* ==================== ANALYTICS GRID ==================== */
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Stat label="Tests Attempted" value={total} />
      <Stat label="Passed" value={passed} />
      <Stat label="Failed" value={failed} />
    </div>
  );
};

/**
 * Stat Component
 *
 * Displays a single analytics metric
 */
const Stat = ({ label, value }) => (
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

export default ProfileAnalytics;
