/**
 * CreateTestForm Component
 *
 * PURPOSE:
 * - Collects basic test information
 * - Defines certificate configuration rules
 * - Acts as STEP 1 of the test creation flow
 *
 * USED IN:
 * - Admin.jsx
 *
 * PROPS:
 * @param {string} title
 * @param {Function} setTitle
 * @param {string} description
 * @param {Function} setDescription
 * @param {number|string} duration
 * @param {Function} setDuration
 * @param {number} questionCount
 * @param {Function} setQuestionCount
 *
 * @param {Object} certificate
 *   - Full certificate configuration object
 * @param {Function} setCertificate
 *
 * @param {Function} onNext
 *   - Callback to proceed to STEP 2 (QuestionsForm)
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

  certificate,
  setCertificate,

  onNext,
}) => {
  /**
   * updateTier
   *
   * PURPOSE:
   * - Updates a specific certificate tier (completion / merit / excellence)
   * - Keeps other tiers untouched
   *
   * @param {string} tier   - Tier key name
   * @param {string} field  - Field inside tier
   * @param {*} value       - New value
   */
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
      
      {/* ================= HEADER ================= */}
      <h2 className="text-xl font-semibold mb-1">
        Create New Test
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Define test details and certificate rules. You can edit later.
      </p>

      {/* ================= BASIC TEST INFO ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        
        {/* TEST TITLE */}
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

        {/* TEST DURATION */}
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

        {/* NUMBER OF QUESTIONS */}
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

        {/* TEST DESCRIPTION */}
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
        
        {/* MASTER CERTIFICATE TOGGLE */}
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

        {/* CERTIFICATE TIERS */}
        {certificate.enabled && (
          <div className="space-y-6">

            {/* COMPLETION CERTIFICATE */}
            <CertificateTier
              title="Completion Certificate"
              tier={certificate.completion}
              onChange={(f, v) =>
                updateTier("completion", f, v)
              }
            />

            {/* MERIT CERTIFICATE */}
            <CertificateTier
              title="Merit Certificate"
              tier={certificate.merit}
              onChange={(f, v) =>
                updateTier("merit", f, v)
              }
            />

            {/* EXCELLENCE CERTIFICATE */}
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

      {/* ================= NEXT STEP BUTTON ================= */}
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

/* =====================================================
   CERTIFICATE TIER COMPONENT

   PURPOSE:
   - Configures a single certificate tier
   - Reused for completion, merit, excellence
===================================================== */

const CertificateTier = ({ title, tier, onChange }) => (
  <div className="border rounded-lg p-4 bg-gray-50">
    
    {/* TIER TITLE */}
    <h4 className="font-semibold mb-3">{title}</h4>

    {/* ENABLE TOGGLE */}
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

    {/* TIER CONFIGURATION */}
    {tier.enabled && (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* MINIMUM PERCENTAGE */}
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

        {/* PRICING TYPE */}
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

        {/* PRICE INPUT (ONLY IF PAID) */}
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
