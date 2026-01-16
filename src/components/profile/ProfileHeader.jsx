/**
 * ProfileHeader Component
 *
 * PURPOSE:
 * - Displays the header section of the Profile page
 * - Shows page title
 * - Provides navigation back to the Dashboard
 *
 * USED IN:
 * - Profile page (top section)
 *
 * PROPS:
 * @param {Function} onBack
 *   • Callback triggered when user clicks "Back to Dashboard"
 */
const ProfileHeader = ({ onBack }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      
      {/* ================= PAGE TITLE ================= */}
      <h1 className="text-2xl font-bold">
        Student Profile
      </h1>

      {/* ================= BACK NAVIGATION ================= */}
      <button
        onClick={onBack}
        className="text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default ProfileHeader;
