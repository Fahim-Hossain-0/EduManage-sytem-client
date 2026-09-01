import { Link } from "react-router";
import { CheckCircle2, ArrowRight, GraduationCap } from "lucide-react";

const BecomeTeacher = () => {
  const benefits = [
    "Create and manage your own professional classes",
    "Earn from your expertise with flexible pricing",
    "Reach students globally with our platform",
    "Build your personal brand as an industry expert"
  ];

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 p-8 md:p-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-5">
                <GraduationCap className="w-3.5 h-3.5" />
                Teaching Opportunities
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight tracking-tight">
                Share Your Knowledge<br />
                <span className="text-primary-200">Inspire the World</span>
              </h2>

              <p className="mb-8 text-base text-primary-100 leading-relaxed max-w-lg">
                Join our elite community of educators and transform your expertise into a global impact. We provide the tools, you provide the passion.
              </p>

              <ul className="space-y-3 mb-8">
                {benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-primary-50">
                    <CheckCircle2 className="w-4 h-4 text-primary-300 shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Link to="/teacher-request">
                <button className="h-12 px-6 rounded-lg bg-white text-primary-700 font-semibold hover:bg-primary-50 transition-all inline-flex items-center gap-2 group">
                  Start Teaching Today
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </Link>
            </div>

            <div className="relative group hidden lg:block">
              <div className="absolute inset-0 bg-white/5 rounded-2xl blur-xl group-hover:bg-white/10 transition-all"></div>
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-lg transform transition-transform group-hover:scale-[1.02]">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000"
                  alt="Educator teaching online"
                  className="w-full object-cover aspect-[4/3]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-5 left-5 right-5 p-4 bg-white/80 backdrop-blur-md rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center text-white text-xs font-bold">JD</div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">Jane Doe</p>
                      <p className="text-xs text-zinc-500">Senior UX Instructor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeTeacher;
