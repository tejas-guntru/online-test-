import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";

const ModulesList = () => {
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(db, "modules"),
      orderBy("updatedAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setModules(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    });

    return unsub;
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Module Drafts</h2>

        <button
          onClick={() => navigate("/admin/modules/new")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + New Module
        </button>
      </div>

      {modules.length === 0 && (
        <p className="text-gray-500">No modules created yet.</p>
      )}

      <div className="space-y-3">
        {modules.map((m) => (
          <div
            key={m.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {m.title || "Untitled Module"}
              </p>
              <p className="text-sm text-gray-500">
                Status: {m.status}
              </p>
            </div>

            <button
              onClick={() => navigate(`/admin/modules/${m.id}`)}
              className="text-blue-600 text-sm"
            >
              Edit →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulesList;
