// ==================== REACT CORE ====================
// useState → to manage Certificate ID input
import { useState } from "react";

// ==================== ROUTING ====================
// useNavigate → programmatic navigation to verification page
import { useNavigate } from "react-router-dom";

/**
 * CertificateVerificationBox Component
 *
 * PURPOSE:
 * - Allows ANY user (public feature) to verify a certificate
 * - Redirects to a verification page using Certificate ID
 *
 * WHY THIS FEATURE MATTERS:
 * - Prevents fake certificates
 * - Adds trust & credibility to your platform
 * - Can be used by employers, institutions, or third parties
 */
const CertificateVerificationBox = () => {
  // Router navigation handler
  const navigate = useNavigate();

  // Stores the entered Certificate ID
  const [certId, setCertId] = useState("");

  /**
   * handleVerify
   *
   * Triggered when user clicks "Verify"
   * - Trims input
   * - Prevents empty submission
   * - Redirects to verification page
   */
  const handleVerify = () => {
    if (!certId.trim()) return;
    navigate(`/verify/${certId.trim()}`);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">
      {/* ================= HEADER ================= */}
      <h2 className="text-lg font-semibold mb-2">
        🔐 Verify Certificate
      </h2>

      {/* ================= DESCRIPTION ================= */}
      <p className="text-sm text-gray-600 mb-3">
        Enter a Certificate ID to verify its authenticity.
      </p>

      {/* ================= INPUT & ACTION ================= */}
      <div className="flex gap-3">
        {/* Certificate ID Input */}
        <input
          type="text"
          placeholder="Enter Certificate ID"
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
          className="border p-2 rounded flex-1"
        />

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default CertificateVerificationBox;
