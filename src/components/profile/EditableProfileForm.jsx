import { useState } from "react";
import { motion } from "framer-motion";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const EditableProfileForm = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;

    try {
      setSaving(true);
      setSaved(false);

      await updateDoc(doc(db, "users", user.uid), { name });

      // subtle confirmation instead of alert
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="
        rounded-xl p-6 mb-6
        bg-[#020617]
        border border-white/5
      "
    >
      {/* ================= NAME FIELD ================= */}
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

      {/* ================= EMAIL FIELD (READ-ONLY) ================= */}
      <label className="block text-sm text-white/70 mb-1">
        Email
      </label>
      <input
        value={user.email}
        disabled
        className="
          w-full px-3 py-2 rounded-md
          bg-black/30
          border border-white/5
          text-white/50
          cursor-not-allowed
        "
      />

      {/* ================= SAVE ACTION ================= */}
      <div className="mt-5 flex items-center gap-4">
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
          onClick={handleSave}
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

        {/* ================= SAVED FEEDBACK ================= */}
        {saved && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-emerald-400"
          >
            Saved
          </motion.span>
        )}
      </div>
    </div>
  );
};

export default EditableProfileForm;
