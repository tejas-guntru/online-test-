// services/certificates.js

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

export const ensureCertificateExists = async (
  db,
  uid,
  result
) => {
  const certRef = doc(db, "certificates", result.id);
  const snap = await getDoc(certRef);

  if (snap.exists()) return;

  await setDoc(certRef, {
    resultId: result.id,
    userId: uid,
    testId: result.testId,
    certificateType: result.certificateEarned,
    percentage: Number(
      ((result.score / result.total) * 100).toFixed(2)
    ),
    issuedAt: serverTimestamp(),
    verified: true,
  });
};
