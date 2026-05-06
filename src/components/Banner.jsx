import React, { useEffect, useState } from "react";
import banner1 from "../assets/banner/anas-alshanti-feXpdV001o4-unsplash.jpg";
import banner2 from "../assets/banner/sabri-tuzcu-wunVFNvqhfE-unsplash.jpg";
import banner3 from "../assets/banner/leone-venter-VieM9BdZKFo-unsplash.jpg";

const Banner = () => {
  const bannerImages = [banner1, banner2, banner3];
  const [current, setCurrent] = useState(0);

  // 🔥 Auto change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full mt-16">
      <div className="relative w-full h-[600px] overflow-hidden rounded-xl">

        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              current === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image}
              className="w-full h-full object-cover"
              alt={`banner${index}`}
            />
          </div>
        ))}

        {/* Optional Manual Controls */}
        <div className="absolute flex justify-between w-full top-1/2 px-5 -translate-y-1/2">
          <button
            onClick={() =>
              setCurrent(
                (current - 1 + bannerImages.length) % bannerImages.length
              )
            }
            className="btn btn-circle"
          >
            ❮
          </button>

          <button
            onClick={() =>
              setCurrent((current + 1) % bannerImages.length)
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

export default Banner;