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

/* =====================================================
   ADMIN COMPONENT

   RESPONSIBILITIES:
   ✔ Create tests (metadata + questions)
   ✔ Define certificate rules
   ✔ View all tests (grid / list)
   ✔ Activate / revoke tests
   ✔ Delete tests (via modal)

   INTENTIONALLY DOES NOT:
   ✘ Edit test content after creation
   ✘ Manage questions after creation
   ✘ Modify questions once test exists

   DESIGN GOAL:
   - Keep test data immutable after creation
   - Protect result integrity
   - Keep admin workflow simple & predictable
===================================================== */

/* ================= UI COMPONENTS ================= */
import AdminHeader from "../components/admin/AdminHeader";
import StepIndicator from "../components/admin/StepIndicator";
import CreateTestForm from "../components/admin/CreateTestForm";
import QuestionsForm from "../components/admin/QuestionsForm";
import TestGrid from "../components/admin/TestGrid";
import TestList from "../components/admin/TestList";
import EditTestModal from "../components/admin/EditTestModal";

const Admin = () => {
  /* =====================================================
     STEP CONTROL
     step = 1 → Test metadata
     step = 2 → Questions input
  ===================================================== */
  const [step, setStep] = useState(1);

  /* =====================================================
     TEST CREATION STATE
     (Used only during test creation flow)
  ===================================================== */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [questionCount, setQuestionCount] = useState(0);

  /* =====================================================
     CERTIFICATE CONFIGURATION
     Stored directly inside the test document
  ===================================================== */
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

  /* =====================================================
     QUESTIONS (TEMPORARY STATE)
     - Exists only during creation
     - Persisted to Firestore on submit
  ===================================================== */
  const [questions, setQuestions] = useState([]);

  /* =====================================================
     TEST MANAGEMENT DATA
     - tests: all tests in Firestore
     - attemptCounts: derived from results collection
  ===================================================== */
  const [tests, setTests] = useState([]);
  const [attemptCounts, setAttemptCounts] = useState({});

  /* =====================================================
     UI STATE
     - viewMode: grid or list view
     - editingTest: test currently opened in modal
  ===================================================== */
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list"
  const [editingTest, setEditingTest] = useState(null);

  /* =====================================================
     FETCH ALL TESTS (REAL-TIME)
     Keeps admin view in sync with Firestore
  ===================================================== */
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "tests"), (snap) => {
      setTests(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  /* =====================================================
     FETCH ATTEMPT COUNTS (REAL-TIME)
     Aggregates attempts per test from results
  ===================================================== */
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

  /* =====================================================
     STEP 1 → GENERATE QUESTIONS
     Initializes empty questions array based on count
  ===================================================== */
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

  /* =====================================================
     QUESTION EDITING (CREATION PHASE ONLY)
  ===================================================== */
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

  /* =====================================================
     CREATE TEST (FINAL SUBMIT)
     - Creates test document
     - Creates all related questions
  ===================================================== */
  const submitTest = async () => {
    try {
      const testRef = await addDoc(collection(db, "tests"), {
        title,
        description,
        duration: Number(duration),
        totalQuestions: questionCount,
        isActive: true,
        certificate,
        createdBy: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });

      // Persist questions
      for (let q of questions) {
        await addDoc(collection(db, "questions"), {
          testId: testRef.id,
          questionText: q.questionText,
          options: q.options,
          correctOptionIndex: q.correctOptionIndex,
        });
      }

      alert("Test created successfully");

      /* RESET CREATION FLOW */
      setStep(1);
      setTitle("");
      setDescription("");
      setDuration("");
      setQuestionCount(0);
      setQuestions([]);
    } catch (err) {
      console.error(err);
      alert("Failed to create test");
    }
  };

  /* =====================================================
     ACTIVATE / REVOKE TEST
     Controls student visibility
  ===================================================== */
  const toggleTest = async (id, status) => {
    await updateDoc(doc(db, "tests", id), {
      isActive: !status,
    });
  };

  /* =====================================================
     RENDER
  ===================================================== */
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Top navigation */}
        <AdminHeader />

        {/* Creation step indicator */}
        <StepIndicator step={step} />

        {/* STEP 1: Test metadata */}
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

        {/* STEP 2: Questions */}
        {step === 2 && (
          <QuestionsForm
            questions={questions}
            updateQuestion={updateQuestion}
            updateOption={updateOption}
            onSubmit={submitTest}
          />
        )}

        {/* TEST MANAGEMENT HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">
            Manage Tests
          </h2>

          {/* View toggle */}
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

        {/* READ + DELETE MODAL */}
        {editingTest && (
          <EditTestModal
            test={editingTest}
            onClose={() => setEditingTest(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Admin;
