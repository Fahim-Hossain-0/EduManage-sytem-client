import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, ShieldCheck } from "lucide-react";
import logo1 from "../assets/banner/anas-alshanti-feXpdV001o4-unsplash.jpg";
import logo2 from "../assets/banner/sabri-tuzcu-wunVFNvqhfE-unsplash.jpg";
import logo3 from "../assets/banner/leone-venter-VieM9BdZKFo-unsplash.jpg";

const Highlight = () => {
  const partners = [
    {
      id: 1,
      name: "Tech Academy",
      logo: logo1,
      desc: "Providing high-quality tech education and training programs for the next generation of developers.",
      tag: "Education Partner"
    },
    {
      id: 2,
      name: "Design Hub",
      logo: logo2,
      desc: "Collaborating on UI/UX innovation and creative design solutions that shape the digital landscape.",
      tag: "Innovation Lead"
    },
    {
      id: 3,
      name: "Dev Network",
      logo: logo3,
      desc: "Supporting developers with cutting-edge tools, professional mentorship, and a thriving global community.",
      tag: "Strategic Ally"
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % partners.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [partners.length]);

  return (
    <section className="py-20 md:py-28 bg-white border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1">
            <div className="section-label">
              <ShieldCheck className="w-3.5 h-3.5" />
              Trusted Partnerships
            </div>
            <h2 className="section-title">
              Collaborating with <span className="text-primary-600">Industry Leaders</span>
            </h2>
            <p className="section-subtitle mb-8">
              We've joined forces with top-tier institutions and organizations to ensure our curriculum remains at the forefront of industry standards.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[logo1, logo2, logo3].map((img, i) => (
                  <img key={i} src={img} className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="Partner" />
                ))}
              </div>
              <p className="text-sm text-zinc-500">
                Joined by <span className="text-zinc-900 font-semibold">500+</span> global partners
              </p>
            </div>
          </div>

          <div className="flex-1 w-full relative">
            <div className="relative z-10">
              {partners.map((partner, index) => (
                <div
                  key={partner.id}
                  className={`transition-all duration-700 ease-in-out ${
                    current === index ? "opacity-100 translate-x-0" : "opacity-0 absolute inset-0 translate-x-8 pointer-events-none"
                  }`}
                >
                  <div className="card-premium p-7 md:p-9">
                    <div className="flex items-start justify-between mb-7">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-zinc-100">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="badge-premium bg-zinc-50 text-zinc-500 border border-zinc-200">
                        {partner.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-zinc-900 mb-3">
                      {partner.name}
                    </h3>

                    <p className="text-zinc-500 leading-relaxed mb-7">
                      &ldquo;{partner.desc}&rdquo;
                    </p>

                    <div className="flex items-center justify-between pt-5 border-t border-zinc-100">
                      <button className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
                        View Case Study
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex gap-1.5">
                        <button
                          onClick={() => setCurrent((current - 1 + partners.length) % partners.length)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-300 transition-all"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setCurrent((current + 1) % partners.length)}
                          className="w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-200 text-zinc-400 hover:text-zinc-900 hover:border-zinc-300 transition-all"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute -top-8 -right-8 w-64 h-64 bg-primary-100/60 rounded-full blur-3xl -z-0"></div>
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-accent-50/60 rounded-full blur-3xl -z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlight;
