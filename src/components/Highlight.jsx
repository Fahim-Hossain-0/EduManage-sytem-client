// src/components/Highlight.jsx

import React, { useEffect, useState } from "react";

// 🔥 Dummy logos (replace later)
import logo1 from "../assets/banner/anas-alshanti-feXpdV001o4-unsplash.jpg";
import logo2 from "../assets/banner/sabri-tuzcu-wunVFNvqhfE-unsplash.jpg";
import logo3 from "../assets/banner/leone-venter-VieM9BdZKFo-unsplash.jpg";

const Highlight = () => {
  const partners = [
    {
      id: 1,
      name: "Tech Academy",
      logo: logo1,
      desc: "عاون providing high-quality tech education and training programs.",
    },
    {
      id: 2,
      name: "Design Hub",
      logo: logo2,
      desc: "Collaborating on UI/UX innovation and creative design solutions.",
    },
    {
      id: 3,
      name: "Dev Network",
      logo: logo3,
      desc: "Supporting developers with tools, mentorship, and community.",
    },
  ];

  const [current, setCurrent] = useState(0);

  // 🔥 Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % partners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-6 bg-base-100 mt-20">
      <h2 className="text-3xl font-bold text-center mb-10">
        Our Partners
      </h2>

      <div className="relative max-w-4xl mx-auto overflow-hidden">

        {partners.map((partner, index) => (
          <div
            key={partner.id}
            className={`transition-all duration-700 ${
              current === index ? "block" : "hidden"
            }`}
          >
            <div className="card bg-base-200 shadow-xl p-8 text-center">

              <img
                src={partner.logo}
                alt={partner.name}
                className="w-32 h-32 object-cover mx-auto rounded-full mb-4"
              />

              <h3 className="text-2xl font-semibold mb-2">
                {partner.name}
              </h3>

              <p className="text-gray-600">
                {partner.desc}
              </p>
            </div>
          </div>
        ))}

        {/* 🔘 Dots Indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {partners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full ${
                current === index ? "bg-primary" : "bg-gray-400"
              }`}
            ></button>
          ))}
        </div>

        {/* ⬅️➡️ Controls */}
        <div className="absolute flex justify-between w-full top-1/2 px-4 -translate-y-1/2">
          <button
            onClick={() =>
              setCurrent(
                (current - 1 + partners.length) % partners.length
              )
            }
            className="btn btn-circle"
          >
            ❮
          </button>

          <button
            onClick={() =>
              setCurrent((current + 1) % partners.length)
            }
            className="btn btn-circle"
          >
            ❯
          </button>
        </div>

      </div>
    </section>
  );
};

export default Highlight;