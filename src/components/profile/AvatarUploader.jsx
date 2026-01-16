// ==================== REACT ====================
// useState → to track upload progress (loading state)
import { useState } from "react";

// ==================== FIREBASE ====================
// storage → Firebase Storage (for image upload)
// db       → Firestore (to store avatar URL in user document)
import { storage, db } from "../../firebase";

// Firebase Storage helpers
// ref           → reference a storage path
// uploadBytes   → upload file
// getDownloadURL → get public URL after upload
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firestore helpers
// doc       → reference a document
// updateDoc → update existing document
import { doc, updateDoc } from "firebase/firestore";

/**
 * AvatarUploader Component
 *
 * PURPOSE:
 * - Allows user to upload and update their profile avatar
 * - Uploads image to Firebase Storage
 * - Saves image URL in Firestore user document
 *
 * USED IN:
 * - Profile page (user account management)
 *
 * PROPS:
 * @param {Object} user - Logged-in user object
 *   • user.uid    → used for storage path & Firestore update
 *   • user.avatar → current avatar URL (if exists)
 */
const AvatarUploader = ({ user }) => {
  // Tracks whether upload is in progress
  // Used to disable repeated uploads and show feedback
  const [uploading, setUploading] = useState(false);

  /**
   * handleUpload
   *
   * Triggered when user selects a file
   * Handles:
   * - Uploading image to Firebase Storage
   * - Fetching public image URL
   * - Updating Firestore user document
   */
  const handleUpload = async (file) => {
    // Guard: no file selected
    if (!file) return;

    try {
      setUploading(true);

      // Storage path:
      // avatars/{userId}.jpg
      // → ensures one avatar per user (overwrite on update)
      const avatarRef = ref(
        storage,
        `avatars/${user.uid}.jpg`
      );

      // Upload image to Firebase Storage
      await uploadBytes(avatarRef, file);

      // Get public download URL
      const url = await getDownloadURL(avatarRef);

      // Save avatar URL in Firestore user document
      await updateDoc(doc(db, "users", user.uid), {
        avatar: url,
      });

      alert("Avatar updated");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      
      {/* ================= AVATAR PREVIEW =================
          Shows current avatar or fallback placeholder */}
      <img
        src={user.avatar || "/avatar-placeholder.png"}
        alt="avatar"
        className="w-24 h-24 rounded-full object-cover border"
      />

      {/* ================= FILE INPUT (CUSTOM UI) =================
          Label acts as clickable button
          File input is hidden for better UX */}
      <label className="cursor-pointer text-sm text-blue-600">
        {uploading ? "Uploading..." : "Change Avatar"}

        <input
          type="file"
          accept="image/*"
          hidden
          onChange={(e) =>
            handleUpload(e.target.files[0])
          }
        />
      </label>
    </div>
  );
};

export default AvatarUploader;
