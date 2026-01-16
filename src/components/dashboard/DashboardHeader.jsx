/**
 * DashboardHeader Component
 *
 * PURPOSE:
 * - Acts as the top navigation bar for the Student Dashboard
 * - Provides quick access to:
 *   • Profile
 *   • Public Leaderboard
 *   • Logout
 *
 * DESIGN GOALS:
 * - Clean and responsive layout
 * - Stateless (logic handled by parent)
 * - Reusable and easy to extend
 */
const DashboardHeader = ({ onProfile, onLeaderboard, onLogout }) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
      
      {/* ================= PAGE TITLE ================= */}
      <h1 className="text-2xl font-bold">
        Student Dashboard
      </h1>

      {/* ================= ACTION BUTTONS =================
          Buttons are passed callbacks instead of logic
          → keeps this component presentational */}
      <div className="flex flex-wrap gap-3">

        {/* Navigate to Profile Page */}
        <button
          onClick={onProfile}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Profile
        </button>

        {/* Navigate to Global/Public Leaderboard */}
        <button
          onClick={onLeaderboard}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Leaderboard 🌍
        </button>

        {/* Logout User */}
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
