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
    <div
      className="
        flex items-center gap-5
        rounded-xl p-5 mb-6
        bg-[#020617]
        border border-white/5
        shadow-[0_10px_30px_rgba(0,0,0,0.4)]
      "
    >
      {/* ================= AVATAR PREVIEW ================= */}
      <div className="relative">
        <img
          src={user.avatar || "/avatar-placeholder.png"}
          alt="avatar"
          className="
            w-24 h-24 rounded-full object-cover
            border border-white/10
          "
        />

        {/* subtle ring for focus */}
        <div className="absolute inset-0 rounded-full ring-1 ring-white/5" />
      </div>

      {/* ================= ACTION ================= */}
      <div className="flex flex-col gap-1">
        <p className="text-sm text-white/80 font-medium">
          Profile Avatar
        </p>

        <label
          className="
            inline-flex items-center gap-2
            text-sm font-medium
            text-white/70
            cursor-pointer
            transition-all duration-200
            hover:text-cyan-300
          "
        >
          {uploading ? "Uploading…" : "Change Avatar"}

          <input
            type="file"
            accept="image/*"
            hidden
            disabled={uploading}
            onChange={(e) =>
              handleUpload(e.target.files[0])
            }
          />
        </label>

        <p className="text-xs text-white/45">
          JPG or PNG • Recommended 1:1
        </p>
      </div>
    </div>
  );
};

export default AvatarUploader;
