const DashboardSearch = ({ value, onChange }) => {
  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search tests..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full md:w-1/2 border p-3 rounded-lg"
      />
    </div>
  );
};

export default DashboardSearch;
