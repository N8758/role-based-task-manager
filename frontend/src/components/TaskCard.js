import API from '../api/api';

export default function TaskCard({ task, onUpdate }) {
  const handleStatusChange = async (e) => {
    try {
      await API.put(`/tasks/${task.id}`, { status: e.target.value });
      if (onUpdate) onUpdate();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    if (status === 'done') return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (status === 'in-progress') return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-amber-100 text-amber-800 border-amber-200';
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4 gap-2">
        <h3 className="font-bold text-slate-800 text-lg leading-tight">{task.title}</h3>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getStatusColor(task.status)} capitalize whitespace-nowrap`}>
          {task.status.replace('-', ' ')}
        </span>
      </div>

      <p className="text-slate-600 text-sm flex-grow mb-6">{task.description}</p>

      <div className="mt-auto space-y-3">
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
          <div>
            <span className="block text-slate-400 mb-0.5">Project</span>
            <span className="font-medium text-slate-700 truncate block">{task.project_name || `ID #${task.project_id}`}</span>
          </div>
          <div>
            <span className="block text-slate-400 mb-0.5">Assignee</span>
            <span className="font-medium text-slate-700 truncate block">{task.assignee_name || `ID #${task.assigned_to}`}</span>
          </div>
          <div className="col-span-2 mt-1 pt-2 border-t border-slate-200/60">
            <span className="block text-slate-400 mb-0.5">Deadline</span>
            <span className="font-medium text-slate-700">{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'}</span>
          </div>
        </div>

        <div className="pt-2">
          <select
            className="w-full bg-white border border-slate-300 text-slate-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none"
            value={task.status}
            onChange={handleStatusChange}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>
    </div>
  );
}