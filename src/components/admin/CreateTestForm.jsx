const CreateTestForm = ({
  title,
  setTitle,
  description,
  setDescription,
  duration,
  setDuration,
  questionCount,
  setQuestionCount,

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

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-1">
        Create New Test
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Define test details and certificate rules. You can edit later.
      </p>

      {/* ================= BASIC INFO ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">
            Test Title
          </label>
          <input
            className="border p-3 rounded w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="JavaScript Fundamentals"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Duration (minutes)
          </label>
          <input
            type="number"
            className="border p-3 rounded w-full"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Number of Questions
          </label>
          <input
            type="number"
            className="border p-3 rounded w-full"
            value={questionCount}
            onChange={(e) =>
              setQuestionCount(Number(e.target.value))
            }
            placeholder="10"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">
            Description
          </label>
          <textarea
            className="border p-3 rounded w-full"
            rows={3}
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="This test evaluates core JavaScript concepts."
          />
        </div>
      </div>

      {/* ================= CERTIFICATE SETTINGS ================= */}
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
            {/* ========== COMPLETION ========== */}
            <CertificateTier
              title="Completion Certificate"
              tier={certificate.completion}
              onChange={(f, v) =>
                updateTier("completion", f, v)
              }
            />

            {/* ========== MERIT ========== */}
            <CertificateTier
              title="Merit Certificate"
              tier={certificate.merit}
              onChange={(f, v) =>
                updateTier("merit", f, v)
              }
            />

            {/* ========== EXCELLENCE ========== */}
            <CertificateTier
              title="Excellence Certificate"
              tier={certificate.excellence}
              onChange={(f, v) =>
                updateTier("excellence", f, v)
              }
            />
          </div>
        )}
      </div>

      <button
        onClick={onNext}
        className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700"
      >
        Next → Add Questions
      </button>
    </div>
  );
};

export default CreateTestForm;

/* ================= CERTIFICATE TIER COMPONENT ================= */

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
