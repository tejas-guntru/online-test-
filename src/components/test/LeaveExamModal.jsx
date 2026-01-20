const LeaveExamModal = ({ open, onStay, onLeave }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        className="
          w-full max-w-md
          rounded-xl p-6
          bg-[#020617]
          border border-white/5
          shadow-[0_20px_40px_rgba(0,0,0,0.65)]
          space-y-4
        "
      >
        {/* ================= TITLE ================= */}
        <h2 className="text-lg font-semibold text-white/90">
          Leave exam?
        </h2>

        {/* ================= MESSAGE ================= */}
        <p className="text-sm text-white/65 leading-relaxed">
          If you leave this page, your exam will be
          <span className="font-medium text-red-400">
            {" "}submitted automatically
          </span>.
          You cannot return once submitted.
        </p>

        {/* ================= ACTIONS ================= */}
        <div className="flex justify-end gap-3 pt-4">
          {/* Stay */}
          <button
            onClick={onStay}
            className="
              px-4 py-2 rounded-md
              bg-white/5
              text-white/70
              transition
              hover:bg-white/10
            "
          >
            Stay in exam
          </button>

          {/* Leave & Submit */}
          <button
            onClick={onLeave}
            className="
              px-5 py-2 rounded-md
              bg-transparent
              border border-red-500/40
              text-red-400
              font-medium
              transition-all
              hover:border-red-400
              hover:text-red-300
              hover:shadow-[0_0_14px_rgba(239,68,68,0.25)]
            "
          >
            Leave & Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveExamModal;
