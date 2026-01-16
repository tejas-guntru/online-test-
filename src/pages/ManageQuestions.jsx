import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  deleteDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

const emptyQuestion = {
  questionText: "",
  options: ["", "", "", ""],
  correctOptionIndex: 0,
};

const ManageQuestions = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH QUESTIONS ================= */
  useEffect(() => {
    const q = query(
      collection(db, "questions"),
      where("testId", "==", testId)
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setQuestions(data);
      setLoading(false);
    });

    return unsub;
  }, [testId]);

  /* ================= UPDATE QUESTION ================= */
  const updateQuestionField = async (id, data) => {
    await updateDoc(doc(db, "questions", id), data);
  };

  /* ================= DELETE QUESTION ================= */
  const deleteQuestion = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (!confirm) return;

    await deleteDoc(doc(db, "questions", id));
  };

  /* ================= ADD QUESTION ================= */
  const addQuestion = async () => {
    await addDoc(collection(db, "questions"), {
      ...emptyQuestion,
      testId,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading questions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Manage Questions
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded bg-gray-800 text-white"
          >
            ← Back
          </button>
        </div>

        {/* QUESTIONS */}
        {questions.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <p className="text-gray-500">
              No questions added yet.
            </p>
            <button
              onClick={addQuestion}
              className="mt-4 px-6 py-2 rounded bg-green-600 text-white"
            >
              + Add First Question
            </button>
          </div>
        ) : (
          questions.map((q, qi) => (
            <div
              key={q.id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold">
                  Question {qi + 1}
                </h2>
                <button
                  onClick={() => deleteQuestion(q.id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </div>

              {/* Question Text */}
              <input
                className="border p-3 w-full rounded mb-4"
                placeholder="Question text"
                value={q.questionText}
                onChange={(e) =>
                  updateQuestionField(q.id, {
                    questionText: e.target.value,
                  })
                }
              />

              {/* Options */}
              {q.options.map((opt, oi) => (
                <label
                  key={oi}
                  className="flex gap-3 items-center border p-2 rounded mb-2"
                >
                  <input
                    type="radio"
                    checked={q.correctOptionIndex === oi}
                    onChange={() =>
                      updateQuestionField(q.id, {
                        correctOptionIndex: oi,
                      })
                    }
                  />
                  <input
                    className="w-full outline-none"
                    placeholder={`Option ${oi + 1}`}
                    value={opt}
                    onChange={(e) => {
                      const updated = [...q.options];
                      updated[oi] = e.target.value;
                      updateQuestionField(q.id, {
                        options: updated,
                      });
                    }}
                  />
                </label>
              ))}
            </div>
          ))
        )}

        {/* ADD QUESTION */}
        {questions.length > 0 && (
          <button
            onClick={addQuestion}
            className="w-full py-3 rounded-xl bg-green-600 text-white font-semibold"
          >
            + Add Another Question
          </button>
        )}
      </div>
    </div>
  );
};

export default ManageQuestions;
