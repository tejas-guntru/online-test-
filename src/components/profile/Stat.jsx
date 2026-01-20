// components/profile/Stat.jsx

const Stat = ({ label, value }) => (
  <div className="border p-4 rounded text-center">
    <p className="text-gray-500">{label}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Stat;
