// ==================== REACT ====================
// useState → to manage form input and saving state
import { useState } from "react";

// ==================== FIREBASE ====================
import { db } from "../../firebase";

// Firestore helpers
// doc       → reference a document
// updateDoc → update existing user profile
import { doc, updateDoc } from "firebase/firestore";

/**
 * EditableProfileForm Component
 *
 * PURPOSE:
 * - Allows user to edit basic profile information
 * - Currently supports updating:
 *   • Name
 * - Email is displayed as read-only
 *
 * USED IN:
 * - Profile page
 *
 * PROPS:
 * @param {Object} user
 *   • uid   → Firestore user document ID
 *   • name  → Initial name value
 *   • email → Read-only email
 */
const EditableProfileForm = ({ user }) => {
  // ==================== STATE ====================
  // Controlled input for user name
  const [name, setName] = useState(user.name);

  // Tracks save operation status
  // Used to disable button and show feedback
  const [saving, setSaving] = useState(false);

  /**
   * handleSave
   *
   * Triggered when user clicks "Save Changes"
   * - Validates input
   * - Updates Firestore user document
   * - Shows success/failure feedback
   */
  const handleSave = async () => {
    // Guard: empty name not allowed
    if (!name.trim()) return;

    try {
      setSaving(true);

      // Update user's name in Firestore
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
      
      {/* ================= NAME FIELD ================= */}
      <label className="block text-sm font-medium mb-1">
        Name
      </label>
      <input
        className="border p-2 rounded w-full mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* ================= EMAIL FIELD (READ-ONLY) ================= */}
      <label className="block text-sm font-medium mb-1">
        Email
      </label>
      <input
        className="border p-2 rounded w-full bg-gray-100"
        value={user.email}
        disabled
      />

      {/* ================= SAVE ACTION ================= */}
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
