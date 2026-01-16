import { useState } from "react";

const EditTestModal = ({ test, onClose, onSave }) => {
  const [title, setTitle] = useState(test.title);
  const [description, setDescription] = useState(
    test.description || ""
  );
  const [duration, setDuration] = useState(test.duration);
  const [isActive, setIsActive] = useState(test.isActive);

  // 🏅 Certificate state (same as CreateTestForm)
  const [certificate, setCertificate] = useState(
    test.certificate || {
      enabled: false,
      completion: {
        enabled: true,
        minPercentage: 40,
        isPaid: false,
        price: 0,
      },
      merit: {
        enabled: false,
        minPercentage: 60,
        isPaid: true,
        price: 99,
      },
      excellence: {
        enabled: false,
        minPercentage: 85,
        isPaid: true,
        price: 199,
      },
    }
  );

  const updateTier = (tier, field, value) => {
    setCertificate((prev) => ({
      ...prev,
      [tier]: {
        ...prev[tier],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    if (!title || !duration) {
      return alert("Required fields missing");
    }

    onSave(test.id, {
      title,
      description,
      duration: Number(duration),
      isActive,
      certificate,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Edit Test
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black"
          >
            ✕
          </button>
        </div>

        {/* BASIC INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium">
              Test Title
            </label>
            <input
              className="border p-3 rounded w-full"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
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
                setDuration(e.target.value)
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

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) =>
                setIsActive(e.target.checked)
              }
            />
            Test Active
          </label>
        </div>

        {/* CERTIFICATE SETTINGS */}
        <div className="border rounded-lg p-5 mb-6">
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
              <CertificateTier
                title="Completion Certificate"
                tier={certificate.completion}
                onChange={(f, v) =>
                  updateTier("completion", f, v)
                }
              />

              <CertificateTier
                title="Merit Certificate"
                tier={certificate.merit}
                onChange={(f, v) =>
                  updateTier("merit", f, v)
                }
              />

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

        {/* ACTIONS */}
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTestModal;

/* ================= CERTIFICATE TIER ================= */

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
