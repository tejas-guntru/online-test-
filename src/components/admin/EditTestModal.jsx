import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";

/**
 * EditTestModal (Read-Only)
 *
 * PURPOSE:
 * - Displays test details in READ-ONLY mode
 * - Allows ADMIN to permanently delete a test
 *
 * IMPORTANT DESIGN DECISION:
 * - No editing of test content is allowed here
 * - No question management
 * - No updates to title / duration / certificate
 *
 * WHY:
 * - Prevents data inconsistency
 * - Keeps admin workflow simple & safe
 * - Test content is immutable after creation
 *
 * USED IN:
 * - Admin.jsx (Grid & List view)
 *
 * PROPS:
 * @param {Object} test    - Full test object from Firestore
 * @param {Function} onClose - Closes the modal
 */
const EditTestModal = ({ test, onClose }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "This will permanently delete:\n\n" +
        "• The test\n" +
        "• All its questions\n" +
        "• All student results\n\n" +
        "This action cannot be undone.\n\n" +
        "Continue?"
    );

    if (!confirmDelete) return;

    try {
      const questionsQuery = query(
        collection(db, "questions"),
        where("testId", "==", test.id)
      );
      const questionsSnap = await getDocs(questionsQuery);

      for (const q of questionsSnap.docs) {
        await deleteDoc(doc(db, "questions", q.id));
      }

      const resultsQuery = query(
        collection(db, "results"),
        where("testId", "==", test.id)
      );
      const resultsSnap = await getDocs(resultsQuery);

      for (const r of resultsSnap.docs) {
        await deleteDoc(doc(db, "results", r.id));
      }

      await deleteDoc(doc(db, "tests", test.id));

      alert("Test deleted successfully");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to delete test");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl w-full max-w-lg text-gray-100">

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Test Details
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* ================= READ-ONLY TEST DETAILS ================= */}
        <div className="space-y-3 text-sm">

          {/* TITLE */}
          <div>
            <p className="text-gray-400">Title</p>
            <p className="font-medium text-gray-100">
              {test.title}
            </p>
          </div>

          {/* DESCRIPTION */}
          <div>
            <p className="text-gray-400">Description</p>
            <p className="text-gray-200">
              {test.description || "No description"}
            </p>
          </div>

          {/* DURATION */}
          <div>
            <p className="text-gray-400">Duration</p>
            <p className="text-gray-200">
              {test.duration} minutes
            </p>
          </div>

          {/* STATUS */}
          <div>
            <p className="text-gray-400">Status</p>
            <p
              className={`font-semibold ${
                test.isActive
                  ? "text-emerald-500"
                  : "text-red-500"
              }`}
            >
              {test.isActive ? "Active" : "Revoked"}
            </p>
          </div>

          {/* THUMBNAIL (OPTIONAL) */}
          {test.thumbnail && (
            <div>
              <p className="text-gray-400 mb-1">
                Thumbnail
              </p>
              <img
                src={test.thumbnail}
                alt="Thumbnail"
                className="w-full h-40 object-cover rounded border border-gray-700"
              />
            </div>
          )}
        </div>

        {/* ================= DANGER ZONE ================= */}
        <div className="mt-6 pt-4 border-t border-gray-800 flex justify-between">

          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Close
          </button>

          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTestModal;
