import { useEffect, useRef, useState } from "react";

/**
 * DashboardHeader Component – Fixed, Auto Hide/Show on Scroll
 */

const DashboardHeader = ({ onProfile, onLogout }) => {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY.current) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current + 10) {
        setVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Spacer to prevent layout jump */}
      <div className="h-20" />

      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          bg-white border-b border-gray-200
          transition-transform duration-300 ease-in-out
          ${visible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div
          className="
            max-w-7xl mx-auto
            px-5 py-4
            flex flex-col gap-4
            md:flex-row md:items-center md:justify-between
          "
        >
          {/* Title */}
          <h1 className="text-xl font-semibold text-gray-900">
            Student Dashboard
          </h1>

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onProfile}
              className="
                px-4 py-2 text-sm font-medium
                text-gray-700 bg-gray-100
                border border-gray-300 rounded-md
                hover:bg-gray-200
                focus:outline-none focus:ring-2 focus:ring-blue-500
              "
            >
              Profile
            </button>

            {/* ✅ Green Logout */}
            <button
              onClick={onLogout}
              className="
                px-4 py-2 text-sm font-medium
                text-white bg-green-600
                border border-green-600 rounded-md
                hover:bg-green-700
                focus:outline-none focus:ring-2 focus:ring-green-500
              "
            >
              Logout
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default DashboardHeader;
