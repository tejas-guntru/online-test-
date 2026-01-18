import { db } from "../../../firebase";
import {
  addDoc,
  updateDoc,
  collection,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const PublishControl = ({ moduleDraft, setModuleDraft }) => {
  const isPublished = moduleDraft.status === "published";

  const saveDraft = async () => {
    try {
      if (!moduleDraft.id) {
        const ref = await addDoc(collection(db, "modules"), {
          ...moduleDraft,
          createdAt: serverTimestamp(),
        });

        setModuleDraft((prev) => ({
          ...prev,
          id: ref.id,
        }));
      } else {
        await updateDoc(
          doc(db, "modules", moduleDraft.id),
          {
            ...moduleDraft,
            updatedAt: serverTimestamp(),
          }
        );
      }

      alert("Draft saved");
    } catch (e) {
      alert("Save failed");
    }
  };

  const publish = async () => {
    if (!moduleDraft.id) {
      alert("Save draft first");
      return;
    }

    try {
      await updateDoc(
        doc(db, "modules", moduleDraft.id),
        {
          status: "published",
          publishedAt: serverTimestamp(),
        }
      );

      setModuleDraft((prev) => ({
        ...prev,
        status: "published",
      }));

      alert("Module published");
    } catch (e) {
      alert("Publish failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow flex justify-between">
      <p>
        Status:{" "}
        <strong>{moduleDraft.status}</strong>
      </p>

      <div className="flex gap-3">
        <button
          onClick={saveDraft}
          disabled={isPublished}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save Draft
        </button>

        <button
          onClick={publish}
          disabled={isPublished}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default PublishControl;
