import { useState } from "react";
import ConfirmLogoutModal from "./ConfirmLogoutModal";

const LogoutSection = ({ onLogout }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mt-12 border-t pt-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">
          Account Actions
        </h3>

        <button
          onClick={() => setOpen(true)}
          className="
            w-full
            md:w-auto
            px-4 py-2
            bg-red-600
            text-white
            rounded
            hover:bg-red-700
            transition
          "
        >
          Logout
        </button>
      </div>

      <ConfirmLogoutModal
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
          onLogout();
        }}
      />
    </>
  );
};

export default LogoutSection;
