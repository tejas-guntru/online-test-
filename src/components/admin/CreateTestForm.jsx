import { useMemo } from "react";

/**
 * CreateTestForm
 * STEP 1 — Test Info + Thumbnail + Certificate Rules
 */
const CreateTestForm = ({
  title,
  setTitle,
  description,
  setDescription,
  duration,
  setDuration,
  questionCount,
  setQuestionCount,

  testThumbnail,
  setTestThumbnail,

  certificate,
  setCertificate,

  onNext,
}) => {
  const updateTier = (tier, field, value) => {
    setCertificate((prev) => ({
      ...prev,
      [tier]: {
        ...prev[tier],
        [field]: value,
      },
    }));
  };

  /* ---------------- VALIDATION ---------------- */

  const validationError = useMemo(() => {
    if (!title.trim()) return "Test title is required";
    if (!duration || duration <= 0)
      return "Duration must be greater than 0";
    if (!questionCount || questionCount <= 0)
      return "At least 1 question required";

    return null;
  }, [title, duration, questionCount]);

  const handleNext = () => {
    if (validationError) {
      alert(validationError);
      return;
    }
    onNext();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      {/* HEADER */}
      <h2 className="text-xl font-semibold mb-1">
        Create New Test
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Define test details and appearance.
      </p>

      {/* BASIC INFO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="text-sm font-medium">
            Test Title
          </label>
          <input
            className="border p-3 rounded w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Duration (minutes)
          </label>
          <input
            type="number"
            className="border p-3 rounded w-full"
            value={duration}
            onChange={(e) =>
              setDuration(Number(e.target.value))
            }
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Number of Questions
          </label>
          <input
            type="number"
            className="border p-3 rounded w-full"
            value={questionCount}
            onChange={(e) =>
              setQuestionCount(Number(e.target.value))
            }
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm font-medium">
            Description
          </label>
          <textarea
            className="border p-3 rounded w-full"
            rows={3}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
        </div>
      </div>

      {/* 🖼️ TEST THUMBNAIL */}
      <div className="border rounded-lg p-5 mb-8">
        <h3 className="font-semibold mb-3">
          Test Thumbnail
        </h3>

        <input
          type="text"
          className="border p-3 rounded w-full mb-3"
          placeholder="https://example.com/test-thumbnail.png"
          value={testThumbnail}
          onChange={(e) =>
            setTestThumbnail(e.target.value)
          }
        />

        {testThumbnail && (
          <img
            src={testThumbnail}
            alt="Test Thumbnail"
            onError={(e) => {
              e.target.src =
                "/test-thumbnail-placeholder.png";
            }}
            className="max-h-48 rounded border"
          />
        )}
      </div>

      {/* CERTIFICATES */}
      <div className="border rounded-lg p-5 mb-8">
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={certificate.enabled}
            onChange={(e) =>
              setCertificate((prev) => ({
                ...prev,
                enabled: e.target.checked,
              }))
            }
          />
          <span className="font-semibold">
            Provide Certificates
          </span>
        </label>

        {certificate.enabled && (
          <div className="space-y-6">
            {["completion", "merit", "excellence"].map(
              (key) => (
                <CertificateTier
                  key={key}
                  title={`${key[0].toUpperCase()}${key.slice(
                    1
                  )} Certificate`}
                  tier={certificate[key]}
                  onChange={(f, v) =>
                    updateTier(key, f, v)
                  }
                />
              )
            )}
          </div>
        )}
      </div>

      {/* NEXT */}
      <button
        onClick={handleNext}
        className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700"
      >
        Next → Add Questions
      </button>
    </div>
  );
};

export default CreateTestForm;

/* =====================================================
   CERTIFICATE TIER (UNCHANGED)
===================================================== */

const CertificateTier = ({ title, tier, onChange }) => (
  <div className="border rounded-lg p-4 bg-gray-50">
    <h4 className="font-semibold mb-3">{title}</h4>

    <label className="flex items-center gap-2 mb-3">
      <input
        type="checkbox"
        checked={tier.enabled}
        onChange={(e) =>
          onChange("enabled", e.target.checked)
        }
      />
      Enabled
    </label>

    {tier.enabled && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="text-sm font-medium">
            Min Percentage
          </label>
          <input
            type="number"
            className="border p-2 rounded w-full"
            value={tier.minPercentage}
            onChange={(e) =>
              onChange(
                "minPercentage",
                Number(e.target.value)
              )
            }
          />
        </div>

        <div>
          <label className="text-sm font-medium">
            Pricing
          </label>
          <select
            className="border p-2 rounded w-full"
            value={tier.isPaid ? "paid" : "free"}
            onChange={(e) =>
              onChange(
                "isPaid",
                e.target.value === "paid"
              )
            }
          >
            <option value="free">Free</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {tier.isPaid && (
          <div>
            <label className="text-sm font-medium">
              Price (₹)
            </label>
            <input
              type="number"
              className="border p-2 rounded w-full"
              value={tier.price}
              onChange={(e) =>
                onChange(
                  "price",
                  Number(e.target.value)
                )
              }
            />
          </div>
        )}
      </div>
    )}
  </div>
);
