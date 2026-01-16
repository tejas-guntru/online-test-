/**
 * ProfileAnalytics Component
 *
 * PURPOSE:
 * - Displays high-level performance analytics for the user
 * - Shows:
 *   • Total tests attempted
 *   • Number of passed tests
 *   • Number of failed tests
 *
 * USED IN:
 * - Profile page → Analytics section
 *
 * PROPS:
 * @param {Array} results
 *   • List of test attempt result objects
 *   • Each result contains score & total
 */
const ProfileAnalytics = ({ results }) => {
  // ==================== CALCULATIONS ====================

  // Total number of attempted tests
  const total = results.length;

  // Number of tests where user scored >= 40%
  const passed = results.filter(
    (r) => (r.score / r.total) * 100 >= 40
  ).length;

  // Failed tests = total - passed
  const failed = total - passed;

  return (
    /* ==================== ANALYTICS GRID ====================
       Responsive stats display */
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
 * PURPOSE:
 * - Displays a single analytics metric
 * - Used only inside ProfileAnalytics
 *
 * PROPS:
 * @param {string} label - Name of the metric
 * @param {number} value - Metric value
 */
const Stat = ({ label, value }) => (
  <div className="border p-4 rounded text-center">
    <p className="text-gray-500">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default ProfileAnalytics;
