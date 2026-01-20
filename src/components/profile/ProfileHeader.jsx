/**
 * ProfileHeader
 *
 * ROLE:
 * - Provides navigation logic for Profile context
 * - Delegates rendering to DashboardHeader
 * - Owns route awareness (active tab)
 * - Owns logout behavior
 *
 * NOTE:
 * - No UI duplication
 * - No "back" navigation
 * - One navbar across student app
 */

import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import DashboardHeader from "../dashboard/DashboardHeader";

const ProfileHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  /* ---------------- NAVIGATION ---------------- */

  const handleNavigate = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <DashboardHeader
      activePath={location.pathname}
      onNavigate={handleNavigate}
      onProfile={() => handleNavigate("/profile")}
      onLogout={handleLogout}
    />
  );
};

export default ProfileHeader;
