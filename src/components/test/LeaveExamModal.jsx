const LeaveExamModal = ({ open, onStay, onLeave }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 space-y-4">

        <h2 className="text-xl font-bold text-gray-800">
          Leave Exam?
        </h2>

        <p className="text-gray-600 text-sm">
          If you leave this page, your exam will be
          <span className="font-semibold text-red-600"> submitted automatically</span>.
          You cannot return once submitted.
        </p>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onStay}
            className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
          >
            Stay in Exam
          </button>

          <button
            onClick={onLeave}
            className="px-5 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
          >
            Leave & Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveExamModal;
