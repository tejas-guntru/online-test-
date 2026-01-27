import { useState } from "react";
import { motion } from "framer-motion";
import ConfirmLogoutModal from "./ConfirmLogoutModal";

const LogoutSection = ({ onLogout }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mt-12 border-t border-white/5 pt-6">
        <h3 className="text-sm font-semibold text-white/70 mb-3">
          Account Actions
        </h3>

        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
          onClick={() => setOpen(true)}
          className="
            inline-flex items-center
            px-4 py-2
            rounded-md
            bg-transparent
            border border-red-500/30
            text-red-400
            hover:border-red-400/60
            hover:text-red-300
          "
        >
          Log out
        </motion.button>
      </div>

      <ConfirmLogoutModal
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
          onLogout();
        }}
      />
    </>
  );
};

export default LogoutSection;
