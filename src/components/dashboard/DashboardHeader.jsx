const DashboardHeader = ({ onProfile, onLeaderboard, onLogout }) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
      <h1 className="text-2xl font-bold">
        Student Dashboard
      </h1>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onProfile}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Profile
        </button>

        <button
          onClick={onLeaderboard}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Leaderboard 🌍
        </button>

        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
