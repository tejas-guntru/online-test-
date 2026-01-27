import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import tgLogo from "../../assets/tg-logo.png";

const DashboardHero = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border border-white/5"
    >
      {/* ===== Background ===== */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#020617] to-[#020617]" />

      {/* Glows */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/25 rounded-full blur-[160px]" />
      <div className="absolute top-1/3 right-[-200px] w-[500px] h-[500px] bg-sky-500/15 rounded-full blur-[180px]" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ===== Content Wrapper ===== */}
      <div className="relative px-6 py-16 sm:px-10 sm:py-24">
        <div className="relative max-w-6xl mx-auto flex gap-12">

          {/* ===== LEFT ===== */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl space-y-8"
          >
            {/* Badge */}
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-cyan-400/15 text-cyan-300 border border-cyan-400/30">
              Performance-Based Certification
            </span>

            {/* Heading */}
            <h1 className="font-semibold leading-tight text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
              Prove Your Skills.
              <span className="block text-cyan-400">
                Earn Certificates That Can Be Verified.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-white/70 leading-relaxed max-w-2xl text-sm sm:text-base md:text-lg">
              Complete structured assessments, get evaluated instantly,
              and earn certificates backed by real performance — not claims.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate("/dashboard/tests")}
                className="
                  px-6 py-3 rounded-xl
                  bg-cyan-500 text-black font-medium
                  hover:bg-cyan-400
                  shadow-[0_0_40px_rgba(34,211,238,0.45)]
                  text-sm sm:text-base
                "
              >
                Start a Test
              </motion.button>

              <motion.button
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate("/dashboard/verify")}
                className="
                  px-6 py-3 rounded-xl
                  border border-white/15
                  text-white/80
                  hover:border-cyan-400/50
                  hover:text-white
                  text-sm sm:text-base
                "
              >
                Verify Certificate
              </motion.button>
            </div>
          </motion.div>

          {/* ===== RIGHT (YouTube card) ===== */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="hidden lg:flex flex-1 items-center justify-end"
          >
            <a
              href="https://youtube.com/@terigoprogress"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group p-6 rounded-2xl
                border border-white/10
                bg-white/5 backdrop-blur
                hover:border-red-500/40
                hover:shadow-[0_0_40px_rgba(239,68,68,0.35)]
                transition
                max-w-xs
                hover:-translate-y-1
              "
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-black/40 border border-white/10 overflow-hidden flex items-center justify-center">
                  <img
                    src={tgLogo}
                    alt="Teri Go Progress"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <p className="text-xs text-white/50">
                    Terigoprogress
                  </p>
                  <h3 className="text-sm font-semibold text-white">
                    YouTube Channel
                  </h3>
                </div>
              </div>

              <p className="text-sm text-white/60 leading-relaxed">
                Tutorials, projects, and real-world guidance on
                development and career growth.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 text-red-400 font-medium">
                Subscribe →
              </div>
            </a>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
};

export default DashboardHero;
