import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const VerifyCertificate = () => {
  const { certificateId } = useParams();
  const [cert, setCert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(
          doc(db, "certificates_public", certificateId)
        );

        if (!snap.exists()) {
          setNotFound(true);
        } else {
          setCert(snap.data());
        }
      } catch (err) {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [certificateId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Verifying certificate…
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        ❌ Invalid or unknown certificate
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">
          ✅ Certificate Verified
        </h1>

        <p><strong>Name:</strong> {cert.userName}</p>
        <p><strong>Test:</strong> {cert.testTitle}</p>
        <p>
          <strong>Score:</strong> {cert.score}/{cert.total} (
          {cert.percentage}%)
        </p>
        <p>
          <strong>Certificate:</strong> {cert.certificateType}
        </p>
        <p>
          <strong>Issued On:</strong>{" "}
          {cert.issuedAt?.toDate().toDateString()}
        </p>

        <p className="mt-4 text-green-600 font-semibold text-center">
          This certificate is authentic and valid.
        </p>
      </div>
    </div>
  );
};

export default VerifyCertificate;
