import React from "react";
import ClassCard from "./ClassCard";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hook/useAxios";
import Loading from "./Loading";
import { Link } from "react-router";
import { Sparkles, ArrowRight } from "lucide-react";

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
    return <Loading />;
  }

  return (
    <section className="py-20 md:py-28 bg-zinc-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-5">
          <div className="max-w-xl">
            <div className="section-label">
              <Sparkles className="w-3.5 h-3.5" />
              Trending Now
            </div>
            <h2 className="section-title">
              Our <span className="text-primary-600">Most Popular</span> Courses
            </h2>
            <p className="section-subtitle">
              Join thousands of students who are already mastering new skills through our highest-rated programs taught by world-class experts.
            </p>
          </div>

          <Link
            to="/all-classes"
            className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors group shrink-0"
          >
            Explore All Classes
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classes.slice(0, 6).map((item) => (
            <ClassCard key={item._id} item={item} />
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link
            to="/all-classes"
            className="btn-secondary text-sm"
          >
            View All Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MostPopular;
