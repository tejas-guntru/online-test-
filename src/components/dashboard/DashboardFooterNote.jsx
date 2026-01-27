import { motion } from "framer-motion";

const DashboardFooterNote = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="pt-8"
    >
      <div
        className="
          relative
          w-full
          rounded-2xl
          border border-white/10
          bg-[#020617]
          px-5 py-4 sm:px-6 sm:py-5
        "
      >
        {/* Accent line */}
        <div className="absolute left-0 top-0 h-full w-1.5 bg-cyan-400 rounded-l-2xl" />

        {/* Content */}
        <div className="max-w-4xl">
          <p
            className="
              text-sm sm:text-base
              text-white/60
              leading-relaxed
              pl-4
            "
          >
            Start a test when you’re ready — once submitted, results are final.
            <span className="block sm:inline">
              {" "}
              That’s what keeps certificates meaningful.
            </span>
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default DashboardFooterNote;
