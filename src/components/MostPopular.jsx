// src/components/MostPopular.jsx

import React, { useEffect, useState } from "react";

// ✅ Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// ✅ Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const MostPopular = () => {
  const [popular, setPopular] = useState([]);

  // 🔥 Dummy data (replace later with API)
  useEffect(() => {
    const dummyData = [
      {
        id: 1,
        title: "Web Development Bootcamp",
        image: "https://via.placeholder.com/300x200",
        students: 1200,
      },
      {
        id: 2,
        title: "UI/UX Design Mastery",
        image: "https://via.placeholder.com/300x200",
        students: 950,
      },
      {
        id: 3,
        title: "React Advanced Course",
        image: "https://via.placeholder.com/300x200",
        students: 800,
      },
      {
        id: 4,
        title: "Node.js Backend Course",
        image: "https://via.placeholder.com/300x200",
        students: 670,
      },
    ];

    setPopular(dummyData);
  }, []);

  return (
    <section className="mt-20 bg-base-200">
      <h2 className="text-3xl font-bold text-center mb-10">
        Most Popular Courses
      </h2>

      <div className="">

        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true} // 🔥 Infinite loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {popular.map((item) => (
            <SwiperSlide  key={item.id}>
              <div className="card bg-base-100 shadow-xl h-full">
                <figure>
                  <img src={item.image} alt={item.title} />
                </figure>

                <div className="card-body">
                  <h3 className="card-title">{item.title}</h3>
                  <p>{item.students} students enrolled</p>

                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default MostPopular;