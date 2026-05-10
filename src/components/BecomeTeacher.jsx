// src/components/BecomeTeacher.jsx

import { Link } from "react-router";

const BecomeTeacher = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <div className="max-w-6xl mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div>
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Share Your Knowledge <br /> Become an Instructor
            </h2>

            <p className="mb-6 text-lg opacity-90">
              Join our growing community of educators and inspire thousands of
              students worldwide. Create courses, earn money, and build your
              teaching brand.
            </p>

            {/* BENEFITS */}
            <ul className="space-y-3 mb-8">
              <li>✅ Create and manage your own classes</li>
              <li>✅ Earn from your expertise</li>
              <li>✅ Reach students globally</li>
              <li>✅ Build your personal brand</li>
            </ul>

            {/* CTA BUTTON */}
            <Link to="/teacher-request">
              <button className="btn bg-white text-indigo-600 hover:bg-gray-100 border-none px-8">
                Start Teaching Today
              </button>
            </Link>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="flex justify-center">
            <img
              src="https://i.ibb.co/9g8H1FQ/teacher-online.png"
              alt="teacher"
              className="w-full max-w-md drop-shadow-2xl"
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default BecomeTeacher;