// src/components/MostPopular.jsx

import React, { useEffect, useState } from "react";

// ✅ Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// ✅ Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import ClassCard from "./ClassCard";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hook/useAxios";
import Loading from "./Loading";

const MostPopular = () => {
const axiosInstance = useAxios();
    const { data: classes = [], isLoading } = useQuery({
       queryKey: ["approved-classes"],
        queryFn: async () => {
            const res = await axiosInstance.get("/all-classes");
            return res.data.result;
        },
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

  

  return (
    <section className="mt-20 bg-base-200">
      <h2 className="text-3xl font-bold text-center mb-10">
        Most Popular Courses
      </h2>

      <div className="">

        <Swiper
          modules={[Autoplay, Navigation]}
          swiper-button-disabled
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
          {classes.map((item) => (
            <SwiperSlide  key={item._id}>
              <ClassCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default MostPopular;