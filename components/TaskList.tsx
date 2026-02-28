
'use client';
import { Task } from '../hooks/useTasks';
export default function TaskList({ tasks, onToggle, onDelete }:{ tasks: Task[]; onToggle: (id:string)=>void; onDelete: (id:string)=>void; }) {
  if (tasks.length === 0) return (<div className="card p-5 text-sm text-slate-500">Inga uppgifter ännu – lägg till med knappen nedan.</div>);
  return (
    <ul className="space-y-3">
      {tasks.map(t => (
        <li key={t.id} className="card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <input type="checkbox" checked={t.done} onChange={()=>onToggle(t.id)} className="h-5 w-5 rounded border-slate-300 accent-[var(--primary)]" />
            <div>
              <div className={`font-medium ${t.done ? 'line-through text-slate-400' : ''}`}>{t.title}</div>
              {t.time && <div className="text-xs text-slate-500 mt-0.5">{t.time}</div>}
            </div>
          </div>
          <button onClick={()=>onDelete(t.id)} className="text-slate-400 hover:text-slate-600" title="Ta bort">🗑️</button>
        </li>
      ))}
    </ul>
  );
}
