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
 */

import { motion } from "framer-motion";

const UserInfoCard = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        mb-8
        rounded-xl p-6
        bg-[#020617]
        border border-white/5
      "
    >
      {/* ================= USER NAME ================= */}
      <div className="mb-3">
        <p className="text-xs text-white/45 uppercase tracking-wide">
          Name
        </p>
        <p className="text-sm font-medium text-white/90">
          {user?.name}
        </p>
      </div>

      {/* ================= USER EMAIL ================= */}
      <div>
        <p className="text-xs text-white/45 uppercase tracking-wide">
          Email
        </p>
        <p className="text-sm text-white/70">
          {user?.email}
        </p>
      </div>
    </motion.div>
  );
};

export default UserInfoCard;
