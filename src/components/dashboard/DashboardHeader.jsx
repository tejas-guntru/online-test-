import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/**
 * DashboardHeader
 *
 * - Primary dashboard navbar
 * - Fixed, full-width
 * - Auto hide/show on scroll
 * - Dark neon theme
 * - Supports nested routes (/dashboard/*)
 */

const DashboardHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  /* ================= SCROLL BEHAVIOR ================= */
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    setVisible(true);

    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY < lastScrollY.current) {
        setVisible(true);
      } else if (currentY > lastScrollY.current + 10) {
        setVisible(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= ROUTE HELPERS ================= */
  const isActive = (path) =>
    location.pathname === path ||
    location.pathname.startsWith(path + "/");

  const go = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  /* ================= TITLE ================= */
  const getTitle = () => {
    if (location.pathname.startsWith("/dashboard/profile")) {
      return "Profile";
    }
    if (location.pathname.startsWith("/dashboard/tests")) {
      return "Tests";
    }
    if (location.pathname.startsWith("/dashboard/attempts")) {
      return "Attempts";
    }
    return "Student Dashboard";
  };

  return (
    <>
      {/* Spacer for fixed header */}
      <div className="h-16 md:h-20" />

      <header
        className={`
          fixed top-0 left-0 right-0
          z-50
          transition-transform duration-300 ease-in-out
          ${visible ? "translate-y-0" : "-translate-y-full"}
          bg-black/80 backdrop-blur-xl
          border-b border-white/10
          shadow-[0_0_40px_rgba(34,211,238,0.25)]
        `}
      >
        <div
          className="
            max-w-7xl mx-auto
            px-4 sm:px-6
            py-3 sm:py-4
            flex flex-col gap-3
            md:flex-row md:items-center md:justify-between
            text-white
          "
        >
          {/* ================= LEFT ================= */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
            <h1 className="text-lg sm:text-xl font-semibold text-cyan-400 tracking-wide">
              {getTitle()}
            </h1>

            <nav className="flex flex-wrap gap-2">
              <NavButton
                active={isActive("/dashboard")}
                onClick={() => go("/dashboard")}
              >
                Home
              </NavButton>

              <NavButton
                active={isActive("/dashboard/tests")}
                onClick={() => go("/dashboard/tests")}
              >
                Tests
              </NavButton>

              <NavButton
                active={isActive("/dashboard/attempts")}
                onClick={() => go("/dashboard/attempts")}
              >
                Attempts
              </NavButton>
            </nav>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="flex gap-2">
            <button
              onClick={() => go("/dashboard/profile")}
              className={`
                px-4 py-2 text-sm font-medium rounded-md transition
                ${
                  isActive("/dashboard/profile")
                    ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.6)]"
                    : "bg-white/10 text-gray-200 border border-white/10 hover:bg-cyan-500/20 hover:text-cyan-300"
                }
              `}
            >
              Profile
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;

/* ================= NAV BUTTON ================= */

const NavButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`
      px-3 py-1.5 text-sm rounded-md font-medium transition
      whitespace-nowrap
      ${
        active
          ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.5)]"
          : "bg-white/10 text-gray-200 border border-white/10 hover:bg-cyan-500/20 hover:text-cyan-300"
      }
    `}
  >
    {children}
  </button>
);
