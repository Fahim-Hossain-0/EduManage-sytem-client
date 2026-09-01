import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import banner1 from "../assets/banner/anas-alshanti-feXpdV001o4-unsplash.jpg";
import banner2 from "../assets/banner/sabri-tuzcu-wunVFNvqhfE-unsplash.jpg";
import banner3 from "../assets/banner/leone-venter-VieM9BdZKFo-unsplash.jpg";
import { Link } from "react-router";

const Banner = () => {
  const bannerImages = [
    {
      url: banner1,
      title: "Master New Skills with Expert Instructors",
      subtitle: "Join over 10 million students learning on the world's most flexible platform.",
      cta: "Explore Courses",
      link: "/all-classes"
    },
    {
      url: banner2,
      title: "Empower Your Teaching Journey",
      subtitle: "Share your knowledge with the world and build your online presence as an educator.",
      cta: "Become a Teacher",
      link: "/teacher-request"
    },
    {
      url: banner3,
      title: "Flexible Learning for Busy Professionals",
      subtitle: "Access high-quality content anytime, anywhere, on any device.",
      cta: "Get Started",
      link: "/register"
    }
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
      {bannerImages.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            current === index ? "opacity-100 scale-105" : "opacity-0 scale-100"
          }`}
        >
          <img
            src={banner.url}
            className="w-full h-full object-cover"
            alt={`banner-${index}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/70 via-zinc-950/40 to-zinc-950/30"></div>
        </div>
      ))}

      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-5">
              {bannerImages[current].title}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-200/90 mb-8 leading-relaxed max-w-xl">
              {bannerImages[current].subtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to={bannerImages[current].link}
                className="inline-flex items-center gap-2 bg-white text-zinc-900 px-6 py-3 rounded-lg font-semibold hover:bg-zinc-100 transition-all active:scale-[0.97]"
              >
                <BookOpen className="w-4 h-4" />
                {bannerImages[current].cta}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <div className="flex items-center gap-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`transition-all duration-300 rounded-full ${
                current === index
                  ? "w-8 h-1.5 bg-white"
                  : "w-1.5 h-1.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="absolute right-6 bottom-8 hidden sm:flex gap-2">
        <button
          onClick={() => setCurrent((current - 1 + bannerImages.length) % bannerImages.length)}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => setCurrent((current + 1) % bannerImages.length)}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm border border-white/10 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default Banner;
