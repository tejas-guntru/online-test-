import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      // 1️⃣ Sign in with Google
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // 2️⃣ Reference to user document
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      // 3️⃣ If user does NOT exist → create (register)
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          role: "student", // default role
          createdAt: serverTimestamp(),
        });

        // New users always go to student dashboard
        navigate("/dashboard");
      } else {
        // 4️⃣ Existing user → role-based redirect
        const role = userSnap.data().role;
        navigate(role === "admin" ? "/admin" : "/dashboard");
      }
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2">
            Online Test App
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Sign in to continue
          </p>

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
