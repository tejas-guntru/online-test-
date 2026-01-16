// ==================== REACT CORE ====================
// useState  → manages component state (loading, data, error)
// useEffect → runs verification logic when page loads or URL changes
import { useEffect, useState } from "react";

// ==================== ROUTING ====================
// useParams → reads dynamic route parameter (:certificateId)
// Example route: /verify/1sAER98nVDbbkeuoTxdl
import { useParams } from "react-router-dom";

// ==================== FIREBASE ====================
// doc     → creates a reference to a Firestore document
// getDoc  → fetches a single Firestore document
import { doc, getDoc } from "firebase/firestore";

// ==================== FIREBASE CONFIG ====================
// db → initialized Firestore instance from firebase.js
import { db } from "../firebase";

/**
 * VerifyCertificate Component
 *
 * PURPOSE:
 * - Public-facing certificate verification page
 * - Allows ANYONE (no login required) to verify a certificate
 *   using a unique Certificate ID
 *
 * ROUTE:
 * - /verify/:certificateId
 *
 * DATA SOURCE:
 * - Firestore collection: "certificates"
 *
 * SECURITY MODEL:
 * - Read-only access
 * - No authentication required
 * - Certificate documents are immutable
 */
const VerifyCertificate = () => {

  /* ================= ROUTE PARAM =================
     Extracts certificateId from the URL.
     Example:
       URL → /verify/1sAER98nVDbbkeuoTxdl
       certificateId → "1sAER98nVDbbkeuoTxdl"
  */
  const { certificateId } = useParams();

  /* ================= STATE ================= */

  // Indicates whether verification is still in progress
  const [loading, setLoading] = useState(true);

  // Becomes true if certificate does not exist or an error occurs
  const [notFound, setNotFound] = useState(false);

  // Stores verified certificate data from Firestore
  const [cert, setCert] = useState(null);

  /* ================= VERIFICATION LOGIC =================
     Runs when:
     - Page first loads
     - certificateId in the URL changes
  */
  useEffect(() => {
    const verify = async () => {
      try {
        // Debug log → helps confirm correct ID is being verified
        console.log("🔍 Verifying:", certificateId);

        // Reference to certificate document
        // Path: certificates/{certificateId}
        const ref = doc(db, "certificates", certificateId);

        // Fetch the document
        const snap = await getDoc(ref);

        // Debug log → confirms whether document exists
        console.log("📄 Exists:", snap.exists());

        // If certificate does NOT exist → invalid
        if (!snap.exists()) {
          setNotFound(true);
        } 
        // Certificate exists → store its data
        else {
          setCert(snap.data());
        }

      } catch (err) {
        // Handles:
        // - Network issues
        // - Permission issues
        // - Wrong Firebase project
        console.error("🔥 Verification error:", err);
        setNotFound(true);

      } finally {
        // Stop loading spinner regardless of result
        setLoading(false);
      }
    };

    verify();
  }, [certificateId]);

  /* ================= LOADING UI ================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Verifying certificate…
      </div>
    );
  }

  /* ================= INVALID CERTIFICATE UI ================= */
  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg">
        ❌ Invalid or unknown certificate
      </div>
    );
  }

  /* ================= VERIFIED CERTIFICATE UI ================= */
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow max-w-md w-full">

        {/* HEADER */}
        <h1 className="text-2xl font-bold text-center mb-4">
          ✅ Certificate Verified
        </h1>

        {/* CERTIFICATE DETAILS */}
        <p><strong>Certificate ID:</strong> {certificateId}</p>
        <p><strong>User ID:</strong> {cert.userId}</p>
        <p><strong>Test ID:</strong> {cert.testId}</p>
        <p><strong>Certificate Type:</strong> {cert.certificateType}</p>
        <p><strong>Percentage:</strong> {cert.percentage}%</p>

        {/* TRUST MESSAGE */}
        <p className="mt-4 text-green-600 font-semibold text-center">
          This certificate is authentic and valid.
        </p>
      </div>
    </div>
  );
};

export default VerifyCertificate;
