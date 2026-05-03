import { useState } from 'react';
import API from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'member'
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/auth/signup', data);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.msg || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-400/20 blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-400/20 blur-3xl"></div>
      
      <div className="glass-panel p-10 w-full max-w-md z-10 fade-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Create Account</h2>
          <p className="text-slate-500 mt-2">Join TaskFlow today</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              className="input-field"
              placeholder="John Doe"
              onChange={e => setData({ ...data, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              required
              className="input-field"
              placeholder="you@company.com"
              onChange={e => setData({ ...data, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              required
              className="input-field"
              placeholder="••••••••"
              onChange={e => setData({ ...data, password: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
            <select
              className="input-field"
              onChange={e => setData({ ...data, role: e.target.value })}
            >
              <option value="member">Member (Staff)</option>
              <option value="admin">Admin (HR/Manager)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-3 text-center transition-all duration-200 shadow-lg shadow-emerald-500/30 mt-2"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-600">
          Already have an account?
          <Link to="/" className="text-emerald-600 ml-1 font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}