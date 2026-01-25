const SideNavDrawer = ({
  open,
  onClose,
  onNavigate,
  topItems = [],
  bottomItems = [],
  isActive,
}) => {
  return (
    <>
      {/* ================= BACKDROP ================= */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/60 backdrop-blur-sm
          transition-opacity
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-full w-64
          bg-[#020617]
          border-r border-white/10
          flex flex-col
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="px-4 py-5 border-b border-white/10">
          <h2 className="text-cyan-400 font-semibold tracking-wide">
            Student Dashboard
          </h2>
        </div>

        {/* ================= TOP NAV ================= */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {topItems.map((item) => (
            <DrawerItem
              key={item.path}
              active={isActive(item.path)}
              onClick={() => onNavigate(item.path)}
            >
              {item.label}
            </DrawerItem>
          ))}
        </nav>

        {/* ================= BOTTOM NAV ================= */}
        <div className="px-2 py-4 border-t border-white/10">
          {bottomItems.map((item) => (
            <DrawerItem
              key={item.path}
              active={isActive(item.path)}
              onClick={() => onNavigate(item.path)}
            >
              {item.label}
            </DrawerItem>
          ))}
        </div>
      </aside>
    </>
  );
};

export default SideNavDrawer;

/* ================= DRAWER ITEM ================= */

const DrawerItem = ({ children, onClick, active }) => (
  <button
    onClick={onClick}
    className={`
      w-full text-left
      px-4 py-3 rounded-md
      text-sm font-medium
      transition-colors duration-200

      ${
        active
          ? `
            bg-cyan-500/20
            text-cyan-300
            border border-cyan-400/40
            shadow-[0_0_14px_rgba(34,211,238,0.35)]
          `
          : `
            text-white/70
            hover:bg-white/5
            hover:text-white/90
          `
      }
    `}
  >
    {children}
  </button>
);
