import { useEffect, useState } from 'react';
import API from '../api/api';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchTasks = async () => {
      try {
        const res = await API.get('/tasks');
        setTasks(res.data);
      } catch (err) {
        console.log("Error:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const total = tasks.length;
  const done = tasks.filter(t => t.status === 'done').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const pending = total - done - inProgress;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Dashboard Overview</h2>
        <p className="text-slate-500 mt-1">Track your team's progress and task statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
          <span className="text-slate-500 text-sm font-medium mb-1">Total Tasks</span>
          <span className="text-3xl font-bold text-slate-800">{total}</span>
        </div>
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl shadow-sm shadow-emerald-500/20 text-white flex flex-col">
          <span className="text-emerald-50 text-sm font-medium mb-1">Completed</span>
          <span className="text-3xl font-bold">{done}</span>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-sm shadow-blue-500/20 text-white flex flex-col">
          <span className="text-blue-50 text-sm font-medium mb-1">In Progress</span>
          <span className="text-3xl font-bold">{inProgress}</span>
        </div>
        <div className="bg-gradient-to-br from-amber-400 to-amber-500 p-6 rounded-2xl shadow-sm shadow-amber-500/20 text-white flex flex-col">
          <span className="text-amber-50 text-sm font-medium mb-1">Pending</span>
          <span className="text-3xl font-bold">{pending}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800">Recent Tasks</h3>
        </div>
        <div className="divide-y divide-slate-100">
          {tasks.slice(0, 5).map(t => (
            <div key={t.id} className="p-6 hover:bg-slate-50 transition-colors duration-150 flex items-center justify-between">
              <div>
                <h4 className="font-medium text-slate-900">{t.title}</h4>
                <div className="text-sm text-slate-500 mt-1 flex gap-3">
                  {t.project_name && <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">Project: {t.project_name}</span>}
                  {t.assignee_name && <span className="text-slate-400">Assigned to: {t.assignee_name}</span>}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                t.status === 'done' ? 'bg-emerald-100 text-emerald-700' :
                t.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                'bg-amber-100 text-amber-700'
              }`}>
                {t.status.replace('-', ' ')}
              </span>
            </div>
          ))}
          {tasks.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              No tasks found. Create a project and add some tasks!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}