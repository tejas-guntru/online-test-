const ProfileStats = ({
  totalTests,
  avgPercentage,
  totalScore,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <StatBox label="Tests Attempted" value={totalTests} />
      <StatBox label="Average Score" value={`${avgPercentage}%`} />
      <StatBox label="Total Score" value={totalScore} />
    </div>
  );
};

const StatBox = ({ label, value }) => (
  <div className="p-4 border rounded text-center">
    <p className="text-gray-500">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default ProfileStats;
