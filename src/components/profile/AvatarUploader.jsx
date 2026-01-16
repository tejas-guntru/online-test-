import { useState } from "react";
import { storage, db } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

const AvatarUploader = ({ user }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file) => {
    if (!file) return;

    try {
      setUploading(true);

      const avatarRef = ref(
        storage,
        `avatars/${user.uid}.jpg`
      );

      await uploadBytes(avatarRef, file);
      const url = await getDownloadURL(avatarRef);

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
      <img
        src={user.avatar || "/avatar-placeholder.png"}
        alt="avatar"
        className="w-24 h-24 rounded-full object-cover border"
      />

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
