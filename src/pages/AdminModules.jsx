import { Routes, Route } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";
import ModulesList from "../components/modules/admin/ModulesList";
import ModuleBuilder from "../components/modules/admin/ModuleBuilder";

const AdminModules = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <AdminHeader />

      <Routes>
        {/* LIST ALL MODULES */}
        <Route index element={<ModulesList />} />

        {/* CREATE NEW MODULE */}
        <Route path="new" element={<ModuleBuilder />} />

        {/* EDIT EXISTING MODULE */}
        <Route path=":id" element={<ModuleBuilder />} />
      </Routes>
    </div>
  );
};

export default AdminModules;
