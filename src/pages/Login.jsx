import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, db } from "../firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import TGLogo from "../assets/tg-logo.png";

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          role: "student",
          createdAt: serverTimestamp(),
        });
        navigate("/dashboard");
      } else {
        const role = userSnap.data().role;
        navigate(role === "admin" ? "/admin" : "/dashboard");
      }
    } catch (error) {
      console.error("Google login failed:", error);
      alert("Google login failed. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center px-4">

      {/* 🌌 BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(0,180,255,0.25),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(0,120,255,0.25),_transparent_60%)]" />

      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full -top-40 left-1/2 -translate-x-1/2 animate-pulse" />
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full bottom-0 right-1/2 translate-x-1/2 animate-pulse" />

      {/* 🔷 CONTENT WRAPPER */}
      <div className="relative z-10 w-full max-w-md -mt-16 sm:mt-0">

        {/* 🔷 MOBILE LOGO (ABOVE CARD) */}
        <div className="flex justify-center sm:hidden mb-3">
          <img
            src={TGLogo}
            alt="TG Logo"
            className="w-20 drop-shadow-[0_0_25px_rgba(0,200,255,0.8)]"
          />
        </div>

        {/* 💎 LOGIN CARD */}
        <div className="bg-black/65 backdrop-blur-xl border border-cyan-500/30 rounded-2xl
          shadow-[0_0_50px_rgba(0,200,255,0.25)] p-8">

          {/* 🔷 DESKTOP LOGO (INSIDE CARD) */}
          <div className="hidden sm:flex justify-center mb-6">
            <img
              src={TGLogo}
              alt="TG Logo"
              className="w-28 drop-shadow-[0_0_30px_rgba(0,200,255,0.9)]"
            />
          </div>

          {/* TITLE */}
          <h1 className="text-center text-3xl font-extrabold tracking-widest text-cyan-400">
            TG PLATFORM
          </h1>

          <p className="text-center text-cyan-200/70 mt-2 mb-8 text-sm">
            Powering the future of assessments
          </p>

          {/* GOOGLE LOGIN */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold
              bg-gradient-to-r from-cyan-500 to-blue-600
              hover:from-blue-600 hover:to-cyan-500
              text-black
              shadow-[0_0_30px_rgba(0,200,255,0.6)]
              hover:shadow-[0_0_50px_rgba(0,200,255,1)]
              transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 48 48">
              <path
                fill="#FFC107"
                d="M43.6 20.4H42V20H24v8h11.3C33.7 32.5 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.6z"
              />
            </svg>
            Continue with Google
          </button>

          <p className="text-center text-xs text-cyan-300/50 mt-6">
            Secure • Encrypted • Zero-trust
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
