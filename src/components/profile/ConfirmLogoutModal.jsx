// components/profile/ConfirmLogoutModal.jsx

const ConfirmLogoutModal = ({ open, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* ================= BACKDROP ================= */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* ================= MODAL ================= */}
      <div
        className="
          relative w-[90%] max-w-sm
          rounded-xl p-6
          bg-[#020617]
          border border-white/5
          shadow-[0_20px_40px_rgba(0,0,0,0.6)]
          animate-fade-in
        "
      >
        <h2 className="text-lg font-semibold text-white/90 mb-2">
          Log out?
        </h2>

        <p className="text-sm text-white/60 mb-6">
          You’ll be signed out of your account.
        </p>

        <div className="flex justify-end gap-3">
          {/* Cancel */}
          <button
            onClick={onCancel}
            className="
              px-4 py-2 rounded-md
              bg-white/5
              text-white/70
              transition
              hover:bg-white/10
            "
          >
            Cancel
          </button>

          {/* Confirm Logout */}
          <button
            onClick={onConfirm}
            className="
              px-4 py-2 rounded-md
              bg-transparent
              border border-red-500/40
              text-red-400
              transition-all
              hover:border-red-400
              hover:text-red-300
              hover:shadow-[0_0_12px_rgba(239,68,68,0.25)]
            "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
