/**
 * UserInfoCard Component
 *
 * PURPOSE:
 * - Displays basic, read-only user information
 * - Provides a quick overview of the logged-in user
 *
 * USED IN:
 * - Profile page (summary section)
 * - Can also be reused in dashboards or admin views
 *
 * PROPS:
 * @param {Object} user
 *   • name  → User's display name
 *   • email → User's registered email address
 */
const UserInfoCard = ({ user }) => {
  return (
    <div className="mb-8 bg-gray-50 p-4 rounded-lg border">
      
      {/* ================= USER NAME ================= */}
      <p>
        <strong>Name:</strong> {user?.name}
      </p>

      {/* ================= USER EMAIL ================= */}
      <p>
        <strong>Email:</strong> {user?.email}
      </p>

    </div>
  );
};

export default UserInfoCard;
