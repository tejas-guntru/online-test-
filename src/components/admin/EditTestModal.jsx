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

  /**
   * handleDelete
   *
   * PURPOSE:
   * - Safely deletes a test and ALL related data
   *
   * DELETION ORDER (IMPORTANT):
   * 1. Questions → prevent orphaned documents
   * 2. Results   → prevent invalid student history
   * 3. Test      → final removal
   *
   * ⚠️ This action is irreversible
   */
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "This will permanently delete:\n\n" +
        "• The test\n" +
        "• All its questions\n" +
        "• All student results\n\n" +
        "This action cannot be undone.\n\n" +
        "Continue?"
    );

    // Abort if admin cancels
    if (!confirmDelete) return;

    try {
      /* ================= DELETE QUESTIONS ================= */
      const questionsQuery = query(
        collection(db, "questions"),
        where("testId", "==", test.id)
      );
      const questionsSnap = await getDocs(questionsQuery);

      for (const q of questionsSnap.docs) {
        await deleteDoc(doc(db, "questions", q.id));
      }

      /* ================= DELETE RESULTS ================= */
      const resultsQuery = query(
        collection(db, "results"),
        where("testId", "==", test.id)
      );
      const resultsSnap = await getDocs(resultsQuery);

      for (const r of resultsSnap.docs) {
        await deleteDoc(doc(db, "results", r.id));
      }

      /* ================= DELETE TEST ================= */
      await deleteDoc(doc(db, "tests", test.id));

      alert("Test deleted successfully");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to delete test");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-lg">

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Test Details
          </h2>

          {/* Close modal */}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* ================= READ-ONLY TEST DETAILS ================= */}
        <div className="space-y-3 text-sm">
          
          {/* TITLE */}
          <div>
            <p className="text-gray-500">Title</p>
            <p className="font-medium">{test.title}</p>
          </div>

          {/* DESCRIPTION */}
          <div>
            <p className="text-gray-500">Description</p>
            <p>{test.description || "No description"}</p>
          </div>

          {/* DURATION */}
          <div>
            <p className="text-gray-500">Duration</p>
            <p>{test.duration} minutes</p>
          </div>

          {/* STATUS */}
          <div>
            <p className="text-gray-500">Status</p>
            <p
              className={`font-semibold ${
                test.isActive
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {test.isActive ? "Active" : "Revoked"}
            </p>
          </div>

          {/* THUMBNAIL (OPTIONAL) */}
          {test.thumbnail && (
            <div>
              <p className="text-gray-500 mb-1">
                Thumbnail
              </p>
              <img
                src={test.thumbnail}
                alt="Thumbnail"
                className="w-full h-40 object-cover rounded border"
              />
            </div>
          )}
        </div>

        {/* ================= DANGER ZONE ================= */}
        <div className="mt-6 pt-4 border-t flex justify-between">

          {/* CLOSE MODAL */}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border"
          >
            Close
          </button>

          {/* DELETE TEST */}
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
