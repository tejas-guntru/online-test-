/**
 * DashboardSearch Component
 *
 * Dark Neon Dashboard styling
 */
const DashboardSearch = ({ value, onChange }) => {
  return (
    <div className="mb-8">
      {/* ================= SEARCH INPUT ================= */}
      <input
        type="text"
        placeholder="Search tests…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full md:w-1/2
          px-4 py-3 rounded-md
          bg-[#020617]
          border border-white/10
          text-white/85
          placeholder-white/40
          focus:outline-none
          focus:border-cyan-400
          focus:shadow-[0_0_0_1px_rgba(34,211,238,0.35)]
          transition
        "
      />
    </div>
  );
};

export default DashboardSearch;
