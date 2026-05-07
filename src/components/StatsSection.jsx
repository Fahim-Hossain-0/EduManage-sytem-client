// src/components/StatsSection.jsx

import { useEffect, useState } from "react";

const StatsSection = () => {
  const [stats, setStats] = useState({
    users: 0,
    classes: 0,
    enrollments: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/stats") // 🔥 your API
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-6xl mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE - CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            {/* Total Users */}
            <div className="bg-base-200 rounded-2xl p-6 text-center shadow">
              <h2 className="text-3xl font-bold text-primary">
                {stats.users}
              </h2>
              <p className="text-gray-500 mt-2">Total Users</p>
            </div>

            {/* Total Classes */}
            <div className="bg-base-200 rounded-2xl p-6 text-center shadow">
              <h2 className="text-3xl font-bold text-secondary">
                {stats.classes}
              </h2>
              <p className="text-gray-500 mt-2">Total Classes</p>
            </div>

            {/* Total Enrollment */}
            <div className="bg-base-200 rounded-2xl p-6 text-center shadow">
              <h2 className="text-3xl font-bold text-accent">
                {stats.enrollments}
              </h2>
              <p className="text-gray-500 mt-2">Total Enrollments</p>
            </div>

          </div>

          {/* RIGHT SIDE - IMAGE */}
          <div className="flex justify-center">
            <img
              src="https://i.ibb.co/3W3kG3v/online-learning.png"
              alt="learning"
              className="w-full max-w-md"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default StatsSection;