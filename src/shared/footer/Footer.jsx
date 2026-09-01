import { Link } from 'react-router';
import { X, Globe, Code2, Mail } from 'lucide-react';
import Logo from '../../components/Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo />
              <span className="font-bold text-lg tracking-tight text-slate-950">EduManage</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-xs">
              Learn practical skills, discover expert-led classes, and grow at your own pace with EduManage.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4">Explore</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-sm text-slate-600 hover:text-slate-950 transition-colors">Home</Link></li>
              <li><Link to="/all-classes" className="text-sm text-slate-600 hover:text-slate-950 transition-colors">All Classes</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4">Platform</h4>
            <ul className="space-y-3">
              <li><Link to="/teacher-request" className="text-sm text-slate-600 hover:text-slate-950 transition-colors">Teach on EduManage</Link></li>
              <li><Link to="/dashboard" className="text-sm text-slate-600 hover:text-slate-950 transition-colors">Student Dashboard</Link></li>
              <li><Link to="/dashboard" className="text-sm text-slate-600 hover:text-slate-950 transition-colors">Teacher Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-4">Support</h4>
            <ul className="space-y-3">
              <li><span className="text-sm text-slate-600">support@edumanage.com</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>&copy; {currentYear} EduManage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
