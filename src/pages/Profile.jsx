import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { generateAvatarUrl } from "../utils/avatar";
import { generateCertificate } from "../utils/generateCertificate";

/* Certificate labels */
const CERTIFICATE_META = {
  completion: { label: "Completion Certificate", icon: "🏅" },
  merit: { label: "Merit Certificate", icon: "🥈" },
  excellence: { label: "Excellence Certificate", icon: "🥇" },
};

const Profile = () => {
  const navigate = useNavigate();
  const uid = auth.currentUser.uid;

  const [userInfo, setUserInfo] = useState(null);
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [testsMap, setTestsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* Payment popup */
  const [showPaymentPopup, setShowPaymentPopup] =
    useState(false);
  const [selectedCert, setSelectedCert] =
    useState(null);

  /* ================= LOAD PROFILE ================= */
  useEffect(() => {
    const load = async () => {
      try {
        const userSnap = await getDoc(
          doc(db, "users", uid)
        );
        const userData = userSnap.data();
        setUserInfo(userData);
        setName(userData.name);

        const q = query(
          collection(db, "results"),
          where("userId", "==", uid)
        );
        const rs = await getDocs(q);
        const resultsData = rs.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setResults(resultsData);

        const testIds = [
          ...new Set(resultsData.map((r) => r.testId)),
        ];
        const map = {};
        for (let id of testIds) {
          const snap = await getDoc(doc(db, "tests", id));
          if (snap.exists()) map[id] = snap.data();
        }
        setTestsMap(map);

        setLoading(false);
      } catch (err) {
        console.error(err);
        navigate("/dashboard");
      }
    };

    load();
  }, [uid, navigate]);

  /* ================= PROFILE UPDATE ================= */
  const saveProfile = async () => {
    if (!name.trim()) return;
    try {
      setSaving(true);
      await updateDoc(doc(db, "users", uid), { name });
      setUserInfo((u) => ({ ...u, name }));
      alert("Profile updated");
    } finally {
      setSaving(false);
    }
  };

  const regenerateAvatar = async () => {
    const avatar = generateAvatarUrl(name + Date.now());
    await updateDoc(doc(db, "users", uid), { avatar });
    setUserInfo((u) => ({ ...u, avatar }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  /* ================= ANALYTICS ================= */
  const totalTests = results.length;
  const totalScore = results.reduce((s, r) => s + r.score, 0);
  const totalQuestions = results.reduce(
    (s, r) => s + r.total,
    0
  );
  const avgPercentage =
    totalQuestions > 0
      ? ((totalScore / totalQuestions) * 100).toFixed(2)
      : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            Student Profile
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-600 hover:underline"
          >
            ← Back
          </button>
        </div>

        {/* AVATAR */}
        <div className="flex items-center gap-6 mb-6">
          <img
            src={userInfo.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full border"
          />
          <button
            onClick={regenerateAvatar}
            className="text-blue-600 hover:underline"
          >
            Generate New Avatar
          </button>
        </div>

        {/* EDIT PROFILE */}
        <div className="bg-gray-50 p-4 rounded-lg border mb-8">
          <label className="block text-sm font-medium mb-1">
            Name
          </label>
          <input
            className="border p-2 rounded w-full mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            className="border p-2 rounded w-full bg-gray-100"
            value={userInfo.email}
            disabled
          />

          <button
            onClick={saveProfile}
            disabled={saving}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* ANALYTICS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Stat label="Tests Attempted" value={totalTests} />
          <Stat
            label="Average Score"
            value={`${avgPercentage}%`}
          />
          <Stat label="Total Score" value={totalScore} />
        </div>

        {/* CERTIFICATES */}
        <h2 className="text-xl font-semibold mb-4">
          Certificates
        </h2>

        <div className="space-y-4">
          {results.map((r) => {
            const test = testsMap[r.testId];
            const tier = r.certificateEarned;
            const cert =
              tier && test?.certificate?.[tier];

            if (!tier) {
              return (
                <div
                  key={r.id}
                  className="border p-4 rounded-lg"
                >
                  <p className="font-semibold">
                    {test?.title}
                  </p>
                  <p className="text-sm text-red-600">
                    ❌ Not eligible for certificate
                  </p>
                </div>
              );
            }

            return (
              <div
                key={r.id}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">
                    {test?.title}
                  </p>
                  <p className="text-sm">
                    {CERTIFICATE_META[tier].icon}{" "}
                    {CERTIFICATE_META[tier].label}
                  </p>

                  {cert?.isPaid ? (
                    <p className="text-sm text-yellow-600">
                      💰 Paid (₹{cert.price})
                    </p>
                  ) : (
                    <p className="text-sm text-green-600">
                      ✔ Free Certificate
                    </p>
                  )}
                </div>

                <button
                  onClick={() => {
                    if (cert?.isPaid) {
                      setSelectedCert({
                        cert,
                        result: r,
                        test,
                      });
                      setShowPaymentPopup(true);
                    } else {
                      generateCertificate({
                        studentName: userInfo.name,
                        testTitle: test.title,
                        score: r.score,
                        total: r.total,
                        percentage: (
                          (r.score / r.total) *
                          100
                        ).toFixed(2),
                        issuedDate: new Date(
                          r.submittedAt.seconds * 1000
                        ).toDateString(),
                        certificateId: r.id,
                      });
                    }
                  }}
                  className={`px-4 py-2 rounded text-white ${
                    cert?.isPaid
                      ? "bg-blue-600"
                      : "bg-green-600"
                  }`}
                >
                  {cert?.isPaid
                    ? "Unlock"
                    : "Download"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* PAYMENT POPUP */}
      {showPaymentPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Payment Required
            </h2>

            <p className="text-center mb-3">
              This certificate requires payment.
            </p>

            <p className="text-center font-bold text-lg mb-4">
              ₹{selectedCert?.cert?.price}
            </p>

            <p className="text-sm text-gray-500 text-center mb-4">
              Payment integration coming soon.
            </p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowPaymentPopup(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Close
              </button>
              <button
                disabled
                className="px-4 py-2 bg-blue-400 text-white rounded cursor-not-allowed"
              >
                Pay & Unlock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="border p-4 rounded text-center">
    <p className="text-gray-500">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Profile;
