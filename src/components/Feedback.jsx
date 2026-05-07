// src/components/Feedback.jsx

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/feedback") // 🔥 your API
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-20 bg-base-200">
      <div className="max-w-6xl mx-auto px-4">

        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Students Say
        </h2>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {feedbacks.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="bg-white rounded-2xl shadow-md p-6 h-full flex flex-col justify-between">

                {/* Feedback Text */}
                <p className="text-gray-600 mb-4">
                  “{item.feedback}”
                </p>

                {/* Class Title */}
                <h4 className="font-semibold text-primary mb-4">
                  {item.classTitle}
                </h4>

                {/* User Info */}
                <div className="flex items-center gap-3 mt-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
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

export default Feedback;