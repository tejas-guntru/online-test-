const ProfileAnalytics = ({ results }) => {
  const total = results.length;
  const passed = results.filter(
    (r) => (r.score / r.total) * 100 >= 40
  ).length;

  const failed = total - passed;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Stat label="Tests Attempted" value={total} />
      <Stat label="Passed" value={passed} />
      <Stat label="Failed" value={failed} />
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="border p-4 rounded text-center">
    <p className="text-gray-500">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default ProfileAnalytics;
