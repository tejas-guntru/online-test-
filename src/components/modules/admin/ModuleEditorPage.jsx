import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import ModuleBuilder from "./ModuleBuilder";

const ModuleEditorPage = () => {
  const { id } = useParams();
  const [moduleDraft, setModuleDraft] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDraft = async () => {
      const ref = doc(db, "modules", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setModuleDraft({
          id: snap.id,
          ...snap.data(),
        });
      }

      setLoading(false);
    };

    loadDraft();
  }, [id]);

  if (loading) {
    return <p>Loading module…</p>;
  }

  if (!moduleDraft) {
    return <p>Module not found.</p>;
  }

  return (
    <ModuleBuilder
      initialDraft={moduleDraft}
    />
  );
};

export default ModuleEditorPage;
