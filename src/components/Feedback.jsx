import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import useAxios from "../hook/useAxios";
import { Quote } from "lucide-react";

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const axiosInstance = useAxios();

  useEffect(() => {
    axiosInstance.get("/api/feedback")
      .then((res) => setFeedbacks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-20 md:py-28 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="section-label justify-center">
            <Quote className="w-3.5 h-3.5" />
            Testimonials
          </div>
          <h2 className="section-title">What Our Students Say</h2>
          <p className="section-subtitle mx-auto">Real feedback from our learning community.</p>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {feedbacks.map((item) => (
            <SwiperSlide key={item._id}>
              <div className="card-premium p-6 h-full flex flex-col">
                <div className="flex-1">
                  <Quote className="w-8 h-8 text-primary-100 mb-3" />
                  <p className="text-sm text-zinc-600 leading-relaxed mb-4">&ldquo;{item.feedback}&rdquo;</p>
                </div>
                <div className="pt-4 border-t border-zinc-100">
                  <h4 className="text-sm font-semibold text-primary-600 mb-2">{item.classTitle}</h4>
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-9 h-9 rounded-full object-cover" />
                    <p className="text-sm font-medium text-zinc-900">{item.name}</p>
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
