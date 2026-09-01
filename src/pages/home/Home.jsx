import { Sparkles, ArrowRight, CheckCircle2, BookOpen, Users, BarChart3, GraduationCap } from "lucide-react";
import MostPopular from "../../components/MostPopular";
import StatsSection from "../../components/StatsSection";
import BecomeTeacher from "../../components/BecomeTeacher";
import { Link } from "react-router";

const Home = () => {
  return (
    <div className="flex flex-col gap-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Learn. Teach. Grow.
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.1]">
                Build Skills That <span className="text-primary">Move You Forward.</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                Discover practical classes from passionate teachers, learn at your own pace, and turn knowledge into real-world skills.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/all-classes" className="btn-primary px-8 py-3">Explore Classes</Link>
                <Link to="/teacher-request" className="btn-secondary px-8 py-3">Start Teaching</Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-slate-100 rounded-3xl overflow-hidden border border-slate-200">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop" alt="Students learning" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust/Partners - Visual only */}
      <section className="py-10 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-medium text-slate-500 mb-8">Trusted by forward-thinking organizations</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            {['Skill Community', 'Learning Network', 'Digital Academy', 'Education Partners'].map(brand => (
              <span key={brand} className="text-xl font-bold text-slate-400">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-950 mb-10 text-center">Explore by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, name: 'Web Development' },
              { icon: BarChart3, name: 'Data Analysis' },
              { icon: GraduationCap, name: 'Design' },
              { icon: Users, name: 'Business' },
            ].map((cat, i) => (
              <div key={i} className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-primary transition-all text-center space-y-3">
                <cat.icon className="w-8 h-8 text-primary mx-auto" />
                <h3 className="font-semibold text-slate-900">{cat.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MostPopular />
      <StatsSection />
      
      {/* How it works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-950 mb-16">How EduManage Works</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Discover', desc: 'Explore classes designed around practical, useful skills.' },
              { title: 'Learn', desc: 'Enroll and learn through structured assignments.' },
              { title: 'Grow', desc: 'Build your skills and keep progressing.' }
            ].map((step, i) => (
              <div key={i} className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mx-auto mb-6">0{i+1}</div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-slate-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BecomeTeacher />
      
      {/* Final CTA */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold text-slate-950 mb-6">Ready to Start Learning?</h2>
        <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">Find your next class and take the next step in your learning journey.</p>
        <Link to="/all-classes" className="btn-primary px-10 py-3">Explore Classes</Link>
      </section>
    </div>
  );
};

export default Home;