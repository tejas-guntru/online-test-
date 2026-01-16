/**
 * ProfileStats Component
 *
 * PURPOSE:
 * - Displays key performance statistics for the user
 * - Focuses on aggregate numbers (not per-test details)
 *
 * USED IN:
 * - Profile page → Statistics section
 *
 * PROPS:
 * @param {number} totalTests
 *   • Total number of tests attempted
 *
 * @param {string|number} avgPercentage
 *   • Average percentage score across all tests
 *
 * @param {number} totalScore
 *   • Sum of scores across all tests
 */
const ProfileStats = ({
  totalTests,
  avgPercentage,
  totalScore,
}) => {
  return (
    /* ==================== STATS GRID ====================
       Responsive layout for desktop and mobile */
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
 * PURPOSE:
 * - Displays a single statistic metric
 * - Used internally by ProfileStats
 *
 * PROPS:
 * @param {string} label - Metric label
 * @param {string|number} value - Metric value
 */
const StatBox = ({ label, value }) => (
  <div className="p-4 border rounded text-center">
    <p className="text-gray-500">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default ProfileStats;
