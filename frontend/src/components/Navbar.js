import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function Navbar() {
  const { token, logout } = useAuth();
  const location = useLocation();

  if (!token) return null;

  const role = localStorage.getItem('role');
  
  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    ...(role === 'admin' ? [{ name: 'Projects', path: '/projects' }] : []),
    { name: 'Tasks', path: '/tasks' },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                TaskFlow
              </span>
            </Link>
            <div className="hidden sm:flex ml-4 pl-4 border-l border-slate-200 flex-col justify-center">
              <div className="text-sm font-semibold text-slate-800">{localStorage.getItem('name') || 'User'}</div>
              <div className="text-xs text-slate-500 font-bold uppercase">{localStorage.getItem('role') === 'admin' ? 'HR' : 'Staff'}</div>
            </div>
            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200 ${
                    location.pathname === link.path
                      ? 'border-blue-500 text-slate-900'
                      : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => { logout(); localStorage.clear(); window.location.href = '/'; }}
              className="px-4 py-2 text-sm font-medium text-white bg-slate-800 hover:bg-slate-700 rounded-lg shadow-sm transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}