/**
 * Profile.jsx
 * Renders INSIDE DashboardLayout
 * No header, no background, content-only
 */

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
import { signOut } from "firebase/auth";

/* UTILS & SERVICES */
import { generateAvatarUrl } from "../utils/avatar";
import { generateCertificate } from "../utils/generateCertificate";
import { calculateAnalytics } from "../utils/profileAnalytics";
import { ensureCertificateExists } from "../services/certificates";

/* PROFILE COMPONENTS */
import AvatarSection from "../components/profile/AvatarSection";
import ProfileForm from "../components/profile/ProfileForm";
import StatsGrid from "../components/profile/StatsGrid";
import TestResultsList from "../components/profile/TestResultsList";
import PaymentPopup from "../components/profile/PaymentPopup";
import LogoutSection from "../components/profile/LogoutSection";

const Profile = () => {
  const navigate = useNavigate();
  const uid = auth.currentUser.uid;

  const [userInfo, setUserInfo] = useState(null);
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [testsMap, setTestsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    const load = async () => {
      const userSnap = await getDoc(doc(db, "users", uid));
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

      const map = {};
      for (let r of resultsData) {
        const snap = await getDoc(doc(db, "tests", r.testId));
        if (snap.exists()) map[r.testId] = snap.data();
      }
      setTestsMap(map);

      setLoading(false);
    };

    load();
  }, [uid]);

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="pt-24 flex items-center justify-center text-cyan-400">
        Loading profile…
      </div>
    );
  }

  return (
    // ⬇️ Padding-top accounts for fixed DashboardHeader
    <div className=" pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-12">

        {/* ================= TITLE ================= */}
        <div>
          <h1 className="text-3xl font-semibold text-cyan-400">
            Your Profile
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your account and certificates
          </p>
        </div>

        {/* ================= AVATAR ================= */}
        <div className="bg-[#020617] border border-white/5 rounded-xl p-6">
          <AvatarSection
            avatar={userInfo.avatar}
            onRegenerate={async () => {
              const avatar = generateAvatarUrl(name + Date.now());
              await updateDoc(doc(db, "users", uid), { avatar });
              setUserInfo((u) => ({ ...u, avatar }));
            }}
          />
        </div>

        {/* ================= PROFILE FORM ================= */}
        <div className="bg-[#020617] border border-white/5 rounded-xl p-6">
          <ProfileForm
            name={name}
            email={userInfo.email}
            setName={setName}
            onSave={async () => {
              setSaving(true);
              await updateDoc(doc(db, "users", uid), { name });
              setSaving(false);
            }}
            saving={saving}
          />
        </div>

        {/* ================= STATS ================= */}
        <StatsGrid analytics={calculateAnalytics(results)} />

        {/* ================= TEST RESULTS ================= */}
        <div className="bg-[#020617] border border-white/5 rounded-xl p-6">
          <TestResultsList
            results={results}
            testsMap={testsMap}
            userInfo={userInfo}
            onPaidClick={(result, cert, test) => {
              setSelectedCert({ result, cert, test });
              setShowPaymentPopup(true);
            }}
            onFreeDownload={async (result, test) => {
              await ensureCertificateExists(db, uid, result);
              generateCertificate({
                studentName: userInfo.name,
                testTitle: test.title,
                score: result.score,
                total: result.total,
                percentage: (
                  (result.score / result.total) * 100
                ).toFixed(2),
                issuedDate: new Date(
                  result.submittedAt.seconds * 1000
                ).toDateString(),
                certificateId: result.id,
              });
            }}
          />
        </div>

        {/* ================= LOGOUT ================= */}
        <div className="pt-8 border-t border-white/5">
          <LogoutSection onLogout={handleLogout} confirm />
        </div>

        {/* ================= PAYMENT POPUP ================= */}
        <PaymentPopup
          open={showPaymentPopup}
          price={selectedCert?.cert?.price}
          onClose={() => setShowPaymentPopup(false)}
        />
      </div>
    </div>
  );
};

export default Profile;
