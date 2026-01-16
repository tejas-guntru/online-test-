// ==================== REACT CORE ====================
// useState    → manages Certificate ID input state
import { useState } from "react";

// ==================== ROUTING ====================
// useNavigate → redirects user to verification page
import { useNavigate } from "react-router-dom";

/**
 * CertificateVerificationBox Component
 *
 * PURPOSE:
 * - Public entry point for certificate verification
 * - Accepts a Certificate ID from user
 * - Redirects to verification page (/verify/:certificateId)
 *
 * DESIGN GOALS:
 * - Simple and trustworthy UI
 * - Works for employers, colleges, recruiters
 * - No login required
 */
const CertificateVerificationBox = () => {
  const navigate = useNavigate();

  // Stores user-entered Certificate ID
  const [certId, setCertId] = useState("");

  // Optional UX feedback for empty input
  const [error, setError] = useState("");

  /**
   * handleVerify
   *
   * - Trims whitespace
   * - Prevents empty submission
   * - Navigates to verification page
   */
  const handleVerify = () => {
    const trimmedId = certId.trim();

    if (!trimmedId) {
      setError("Please enter a valid Certificate ID");
      return;
    }

    setError("");
    navigate(`/verify/${trimmedId}`);
  };

  /**
   * handleKeyDown
   *
   * - Allows pressing Enter to verify
   * - Improves accessibility & UX
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleVerify();
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6 border">

      {/* ================= HEADER ================= */}
      <h2 className="text-xl font-semibold mb-1 flex items-center gap-2">
        🔐 Verify Certificate
      </h2>

      {/* ================= DESCRIPTION ================= */}
      <p className="text-sm text-gray-600 mb-4">
        Enter a Certificate ID to check whether the certificate is authentic.
      </p>

      {/* ================= INPUT & ACTION ================= */}
      <div className="flex flex-col sm:flex-row gap-3">

        {/* Certificate ID Input */}
        <input
          type="text"
          placeholder="e.g. 1sAER98nVDbbkeuoTxdl"
          value={certId}
          onChange={(e) => {
            setCertId(e.target.value);
            setError("");
          }}
          onKeyDown={handleKeyDown}
          className={`border p-3 rounded flex-1 focus:outline-none focus:ring-2 ${
            error
              ? "border-red-400 focus:ring-red-300"
              : "focus:ring-blue-300"
          }`}
        />

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="bg-blue-600 text-white px-6 py-3 rounded font-medium hover:bg-blue-700 transition"
        >
          Verify
        </button>
      </div>

      {/* ================= ERROR MESSAGE ================= */}
      {error && (
        <p className="text-sm text-red-600 mt-2">
          {error}
        </p>
      )}

      {/* ================= TRUST FOOTER ================= */}
      <p className="text-xs text-gray-500 mt-4">
        🔎 Verification is public and does not require login.
      </p>
    </div>
  );
};

export default CertificateVerificationBox;
