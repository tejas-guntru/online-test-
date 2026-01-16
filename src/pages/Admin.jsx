import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";

// Components
import AdminHeader from "../components/admin/AdminHeader";
import StepIndicator from "../components/admin/StepIndicator";
import CreateTestForm from "../components/admin/CreateTestForm";
import QuestionsForm from "../components/admin/QuestionsForm";
import TestGrid from "../components/admin/TestGrid";
import TestList from "../components/admin/TestList";
import EditTestModal from "../components/admin/EditTestModal";

const Admin = () => {
  /* ================= STEP CONTROL ================= */
  const [step, setStep] = useState(1);

  /* ================= TEST BASIC INFO ================= */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [questionCount, setQuestionCount] = useState(0);

  /* ================= CERTIFICATE CONFIG ================= */
  const [certificate, setCertificate] = useState({
    enabled: true,
    completion: {
      enabled: true,
      minPercentage: 40,
      isPaid: false,
      price: 0,
    },
    merit: {
      enabled: true,
      minPercentage: 60,
      isPaid: true,
      price: 99,
    },
    excellence: {
      enabled: true,
      minPercentage: 85,
      isPaid: true,
      price: 199,
    },
  });

  /* ================= QUESTIONS ================= */
  const [questions, setQuestions] = useState([]);

  /* ================= TEST LIST ================= */
  const [tests, setTests] = useState([]);

  /* ================= ANALYTICS ================= */
  const [attemptCounts, setAttemptCounts] = useState({});

  /* ================= UI STATE ================= */
  const [viewMode, setViewMode] = useState("grid"); // grid | list
  const [editingTest, setEditingTest] = useState(null);

  /* ================= FETCH TESTS ================= */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tests"), (snap) => {
      setTests(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  /* ================= FETCH ATTEMPT COUNTS ================= */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "results"), (snap) => {
      const counts = {};
      snap.docs.forEach((d) => {
        const { testId } = d.data();
        counts[testId] = (counts[testId] || 0) + 1;
      });
      setAttemptCounts(counts);
    });
    return unsub;
  }, []);

  /* ================= STEP 1 → GENERATE QUESTIONS ================= */
  const generateQuestions = () => {
    if (!title || !duration || questionCount <= 0) {
      return alert("Fill all required fields");
    }

    setQuestions(
      Array.from({ length: questionCount }, () => ({
        questionText: "",
        options: ["", "", "", ""],
        correctOptionIndex: 0,
      }))
    );

    setStep(2);
  };

  /* ================= QUESTION EDITING ================= */
  const updateQuestion = (qi, field, value) => {
    const copy = [...questions];
    copy[qi][field] = value;
    setQuestions(copy);
  };

  const updateOption = (qi, oi, value) => {
    const copy = [...questions];
    copy[qi].options[oi] = value;
    setQuestions(copy);
  };

  /* ================= CREATE TEST ================= */
  const submitTest = async () => {
    try {
      const testRef = await addDoc(collection(db, "tests"), {
        title,
        description,
        duration: Number(duration),
        totalQuestions: questionCount,
        isActive: true,
        certificate, // 🔥 FULL CERTIFICATE STRUCTURE
        createdBy: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });

      for (let q of questions) {
        await addDoc(collection(db, "questions"), {
          testId: testRef.id,
          questionText: q.questionText,
          options: q.options,
          correctOptionIndex: q.correctOptionIndex,
        });
      }

      alert("Test created successfully");

      /* RESET */
      setStep(1);
      setTitle("");
      setDescription("");
      setDuration("");
      setQuestionCount(0);
      setQuestions([]);
      setCertificate({
        enabled: true,
        completion: {
          enabled: true,
          minPercentage: 40,
          isPaid: false,
          price: 0,
        },
        merit: {
          enabled: true,
          minPercentage: 60,
          isPaid: true,
          price: 99,
        },
        excellence: {
          enabled: true,
          minPercentage: 85,
          isPaid: true,
          price: 199,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create test");
    }
  };

  /* ================= ACTIVATE / REVOKE ================= */
  const toggleTest = async (id, status) => {
    await updateDoc(doc(db, "tests", id), {
      isActive: !status,
    });
  };

  /* ================= UPDATE TEST (FROM MODAL) ================= */
  const updateTest = async (id, data) => {
    try {
      await updateDoc(doc(db, "tests", id), data);
    } catch (err) {
      console.error(err);
      alert("Failed to update test");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER */}
        <AdminHeader />

        {/* STEP INDICATOR */}
        <StepIndicator step={step} />

        {/* CREATE TEST */}
        {step === 1 && (
          <CreateTestForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            duration={duration}
            setDuration={setDuration}
            questionCount={questionCount}
            setQuestionCount={setQuestionCount}
            certificate={certificate}
            setCertificate={setCertificate}
            onNext={generateQuestions}
          />
        )}

        {step === 2 && (
          <QuestionsForm
            questions={questions}
            updateQuestion={updateQuestion}
            updateOption={updateOption}
            onSubmit={submitTest}
          />
        )}

        {/* VIEW TOGGLE */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            Manage Tests
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-1.5 rounded ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-1.5 rounded ${
                viewMode === "list"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* GRID VIEW */}
        {viewMode === "grid" && (
          <TestGrid
            tests={tests}
            attemptCounts={attemptCounts}
            onToggle={toggleTest}
            onEdit={(test) => setEditingTest(test)}
          />
        )}

        {/* LIST VIEW */}
        {viewMode === "list" && (
          <TestList
            tests={tests}
            attemptCounts={attemptCounts}
            onToggle={toggleTest}
            onEdit={(test) => setEditingTest(test)}
          />
        )}

        {/* EDIT MODAL */}
        {editingTest && (
          <EditTestModal
            test={editingTest}
            onClose={() => setEditingTest(null)}
            onSave={(id, data) => {
              updateTest(id, data);
              setEditingTest(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
