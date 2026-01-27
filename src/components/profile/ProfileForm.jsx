// components/profile/ProfileForm.jsx

import { motion } from "framer-motion";

const ProfileForm = ({
  name,
  email,
  setName,
  onSave,
  saving,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        rounded-xl p-6 mb-8
        bg-[#020617]
        border border-white/5
      "
    >
      {/* ================= NAME ================= */}
      <label className="block text-sm text-white/70 mb-1">
        Name
      </label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="
          w-full mb-4 px-3 py-2 rounded-md
          bg-black/40
          border border-white/10
          text-white/85
          placeholder-white/40
          focus:outline-none
          focus:border-cyan-400/70
          focus:shadow-[0_0_0_1px_rgba(34,211,238,0.25)]
          transition
        "
      />

      {/* ================= EMAIL (READ-ONLY) ================= */}
      <label className="block text-sm text-white/70 mb-1">
        Email
      </label>
      <input
        value={email}
        disabled
        className="
          w-full px-3 py-2 rounded-md
          bg-black/30
          border border-white/5
          text-white/50
          cursor-not-allowed
        "
      />

      {/* ================= ACTION ================= */}
      <div className="mt-5">
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
          onClick={onSave}
          disabled={saving}
          className="
            inline-flex items-center justify-center
            px-5 py-2 rounded-md
            text-sm font-medium
            bg-transparent
            border border-white/10
            text-white/80
            hover:border-cyan-400/60
            hover:text-cyan-300
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {saving ? "Saving…" : "Save Changes"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProfileForm;
