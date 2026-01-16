import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
  const navigate = useNavigate();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const snap = await getDocs(
          collection(db, "leaderboard")
        );

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        data.sort(
          (a, b) => b.averagePercentage - a.averagePercentage
        );

        setLeaders(data);
        setLoading(false);
      } catch (err) {
        console.error("Leaderboard error:", err);
        navigate("/dashboard");
      }
    };

    fetchLeaderboard();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading leaderboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">
          🏆 Leaderboard
        </h1>

        {leaders.length === 0 ? (
          <p className="text-center text-gray-500">
            No leaderboard data yet.
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">Rank</th>
                <th className="p-3">Name</th>
                <th className="p-3">Tests</th>
                <th className="p-3">Avg %</th>
              </tr>
            </thead>
            <tbody>
              {leaders.map((u, i) => (
                <tr key={u.id} className="border-b">
                  <td className="p-3">#{i + 1}</td>
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.totalTests}</td>
                  <td className="p-3">
                    {u.averagePercentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-blue-600 hover:underline"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
