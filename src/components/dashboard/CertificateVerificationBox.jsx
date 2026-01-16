import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CertificateVerificationBox = () => {
  const navigate = useNavigate();
  const [certId, setCertId] = useState("");

  const handleVerify = () => {
    if (!certId.trim()) return;
    navigate(`/verify/${certId.trim()}`);
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow mb-6">
      <h2 className="text-lg font-semibold mb-2">
        🔐 Verify Certificate
      </h2>

      <p className="text-sm text-gray-600 mb-3">
        Enter a Certificate ID to verify its authenticity.
      </p>

      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Enter Certificate ID"
          value={certId}
          onChange={(e) => setCertId(e.target.value)}
          className="border p-2 rounded flex-1"
        />

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
