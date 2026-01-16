import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

/**
 * Login Component
 *
 * PURPOSE:
 * - Handles Google Authentication
 * - Registers new users in Firestore
 * - Redirects users based on role (admin / student)
 *
 * AUTH FLOW:
 * Google Sign-In
 *   ↓
 * Check if user exists in Firestore
 *   ↓
 * If new → create user document
 * If existing → read role
 *   ↓
 * Role-based navigation
 */
const Login = () => {
  const navigate = useNavigate();

  /**
   * handleGoogleLogin
   *
   * RESPONSIBILITIES:
   * 1. Authenticate user via Google
   * 2. Sync user with Firestore database
   * 3. Assign default role if new
   * 4. Redirect user based on role
   */
  const handleGoogleLogin = async () => {
    try {
      /* ================= 1️⃣ GOOGLE AUTH =================
         Opens Google popup and authenticates user */
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      /* ================= 2️⃣ FIRESTORE USER CHECK =================
         Each authenticated user MUST have a Firestore record */
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      /* ================= 3️⃣ NEW USER REGISTRATION =================
         If user logs in for the first time, create a profile */
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,                 // Firebase Auth UID
          name: user.displayName,        // Google display name
          email: user.email,             // Google email
          role: "student",               // Default role
          createdAt: serverTimestamp(),  // Audit / analytics
        });

        /* New users always land on student dashboard */
        navigate("/dashboard");
      } 
      /* ================= 4️⃣ EXISTING USER =================
         Role-based redirection */
      else {
        const role = userSnap.data().role;

        /* Admins → Admin panel
           Students → Student dashboard */
        navigate(role === "admin" ? "/admin" : "/dashboard");
      }
    } catch (error) {
      /* ================= ERROR HANDLING ================= */
      console.error("Google login failed:", error);
      alert("Google login failed. Please try again.");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">

          {/* APP TITLE */}
          <h1 className="text-3xl font-bold text-center mb-2">
            Online Test App
          </h1>

          {/* SUBTITLE */}
          <p className="text-gray-500 text-center mb-8">
            Sign in to continue
          </p>

          {/* GOOGLE LOGIN BUTTON */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Continue with Google
          </button>

        </div>
      </div>
    </div>
  );
};

export default Login;
