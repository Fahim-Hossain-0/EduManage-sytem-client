import { Link } from 'react-router';
import { Home, ArrowLeft } from 'lucide-react';

const Error = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
            <div className="text-center max-w-md">
                <div className="w-20 h-20 rounded-2xl bg-zinc-100 flex items-center justify-center mx-auto mb-6">
                    <span className="text-4xl font-bold text-zinc-300">404</span>
                </div>
                <h1 className="text-2xl font-bold text-zinc-900 mb-2">Page Not Found</h1>
                <p className="text-zinc-500 mb-8">The page you are looking for doesn't exist or has been moved.</p>
                <div className="flex items-center justify-center gap-3">
                    <Link to="/" className="btn-primary inline-flex items-center gap-2 text-sm py-2.5">
                        <Home className="w-4 h-4" /> Go Home
                    </Link>
                    <button onClick={() => window.history.back()} className="btn-secondary inline-flex items-center gap-2 text-sm py-2.5">
                        <ArrowLeft className="w-4 h-4" /> Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Error;
