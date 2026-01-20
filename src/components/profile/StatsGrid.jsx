// components/profile/StatsGrid.jsx

import Stat from "./Stat";

const StatsGrid = ({ analytics }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
    <Stat label="Tests Attempted" value={analytics.totalTests} />
    <Stat label="Average Score" value={`${analytics.avgPercentage}%`} />
    <Stat label="Total Score" value={analytics.totalScore} />
  </div>
);

export default StatsGrid;
