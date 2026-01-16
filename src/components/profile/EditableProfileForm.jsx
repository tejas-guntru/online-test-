import { useState } from "react";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

const EditableProfileForm = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return;

    try {
      setSaving(true);
      await updateDoc(doc(db, "users", user.uid), {
        name,
      });
      alert("Profile updated");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg border mb-6">
      <label className="block text-sm font-medium mb-1">
        Name
      </label>
      <input
        className="border p-2 rounded w-full mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="block text-sm font-medium mb-1">
        Email
      </label>
      <input
        className="border p-2 rounded w-full bg-gray-100"
        value={user.email}
        disabled
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default EditableProfileForm;
