const ProfileHeader = ({ onBack }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">
        Student Profile
      </h1>

      <button
        onClick={onBack}
        className="text-blue-600 hover:underline"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default ProfileHeader;
