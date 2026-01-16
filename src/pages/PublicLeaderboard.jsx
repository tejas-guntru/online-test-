import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const PublicLeaderboard = () => {
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNames = async () => {
      const snap = await getDocs(
        collection(db, "leaderboard_public")
      );

      const data = snap.docs.map((doc, index) => ({
        rank: index + 1,
        name: doc.data().name,
      }));

      setNames(data);
      setLoading(false);
    };

    fetchNames();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading leaderboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">
          🏆 Leaderboard
        </h1>

        {names.length === 0 ? (
          <p className="text-center text-gray-500">
            No leaderboard data yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {names.map((u) => (
              <li
                key={u.rank}
                className="flex justify-between border-b pb-2"
              >
                <span>#{u.rank}</span>
                <span className="font-semibold">
                  {u.name}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PublicLeaderboard;
