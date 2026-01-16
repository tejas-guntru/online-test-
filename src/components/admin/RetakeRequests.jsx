// ==================== REACT ====================
import { useEffect, useState } from "react";

// ==================== FIREBASE ====================
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

/**
 * RetakeRequests (Admin)
 *
 * FEATURES:
 * - View all Try Again requests
 * - Approve → delete result + request
 * - Reject → delete request
 * - Show student name/email + test title
 * - Search by name / email / test title
 */
const RetakeRequests = () => {
  const [requests, setRequests] = useState([]);
  const [testsMap, setTestsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);

  // 🔍 Search / filter state
  const [searchTerm, setSearchTerm] = useState("");

  /* ================= LOAD REQUESTS + TEST TITLES ================= */
  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(
          collection(db, "retake_requests")
        );

        const reqs = snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setRequests(reqs);

        // Fetch test titles
        const testIds = [
          ...new Set(reqs.map((r) => r.testId)),
        ];

        const map = {};
        for (let id of testIds) {
          const tSnap = await getDoc(
            doc(db, "tests", id)
          );
          if (tSnap.exists()) {
            map[id] = tSnap.data().title;
          }
        }

        setTestsMap(map);
      } catch (err) {
        console.error("Failed to load Try Again requests:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  /* ================= APPROVE ================= */
  const approveRequest = async (req) => {
    const ok = window.confirm(
      "Approve Try Again?\n\nThis will DELETE the previous test result."
    );
    if (!ok) return;

    try {
      setProcessingId(req.id);

      await deleteDoc(doc(db, "results", req.resultId));
      await deleteDoc(doc(db, "retake_requests", req.id));

      setRequests((prev) =>
        prev.filter((r) => r.id !== req.id)
      );
    } catch (err) {
      console.error("Approval failed:", err);
      alert("Failed to approve Try Again.");
    } finally {
      setProcessingId(null);
    }
  };

  /* ================= REJECT ================= */
  const rejectRequest = async (req) => {
    const ok = window.confirm(
      "Reject Try Again request?\n\nThe student may request again later."
    );
    if (!ok) return;

    try {
      setProcessingId(req.id);

      await deleteDoc(
        doc(db, "retake_requests", req.id)
      );

      setRequests((prev) =>
        prev.filter((r) => r.id !== req.id)
      );
    } catch (err) {
      console.error("Reject failed:", err);
      alert("Failed to reject Try Again.");
    } finally {
      setProcessingId(null);
    }
  };

  /* ================= FILTERED DATA ================= */
  const filteredRequests = requests.filter((req) => {
    const q = searchTerm.toLowerCase();

    const name = req.userName?.toLowerCase() || "";
    const email = req.userEmail?.toLowerCase() || "";
    const testTitle =
      testsMap[req.testId]?.toLowerCase() || "";

    return (
      name.includes(q) ||
      email.includes(q) ||
      testTitle.includes(q)
    );
  });

  /* ================= UI ================= */

  if (loading) {
    return (
      <div className="p-6 text-gray-600">
        Loading Try Again requests…
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* 🔍 SEARCH BAR */}
      <input
        type="text"
        placeholder="Search by student name, email, or test title…"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border rounded-lg p-3 focus:outline-none focus:ring focus:border-blue-400"
      />

      {/* EMPTY STATE */}
      {filteredRequests.length === 0 && (
        <div className="text-gray-500 p-6 text-center">
          No matching Try Again requests.
        </div>
      )}

      {/* REQUEST LIST */}
      {filteredRequests.map((req) => (
        <div
          key={req.id}
          className="border rounded-xl p-5 bg-white shadow-sm"
        >
          {/* STUDENT */}
          <div>
            <p className="font-semibold text-lg">
              {req.userName || "Unknown Student"}
            </p>
            <p className="text-sm text-gray-600">
              {req.userEmail || `UID: ${req.userId}`}
            </p>
          </div>

          {/* TEST */}
          <div className="mt-2 text-sm">
            <span className="font-semibold">
              Test:
            </span>{" "}
            {testsMap[req.testId] || "Unknown Test"}
          </div>

          {/* SCORE */}
          <div className="mt-2 text-sm">
            Score:{" "}
            <span className="font-semibold">
              {req.originalScore}/{req.originalTotal}
            </span>{" "}
            ({req.originalPercentage}%)
          </div>

          {/* ACTIONS */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => approveRequest(req)}
              disabled={processingId === req.id}
              className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
            >
              Approve & Allow Try Again
            </button>

            <button
              onClick={() => rejectRequest(req)}
              disabled={processingId === req.id}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RetakeRequests;
