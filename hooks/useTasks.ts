
import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
export type Task = { id: string; title: string; time?: string; date: string; done: boolean; };
const VERSION = 'v1';
function keyFor(user: string) { return `md:${VERSION}:${user}:tasks`; }
export function useTasks(user: string) {
  const [all, setAll] = useLocalStorage<Task[]>(keyFor(user), []);
  function add(t: Omit<Task,'id'|'done'>) { const id = (globalThis as any)?.crypto?.randomUUID?.() ?? String(Date.now()); setAll([ ...all, { ...t, id, done:false } ]); }
  function toggle(id: string) { setAll(all.map(t => t.id === id ? { ...t, done: !t.done } : t)); }
  function remove(id: string) { setAll(all.filter(t => t.id !== id)); }
  function tasksFor(date: string) { return all.filter(t => t.date === date).sort((a,b) => (a.time||'') < (b.time||'') ? -1 : 1); }
  const stats = useMemo(() => { const by = new Map<string,{done:number,total:number}>(); for (const t of all){ const s = by.get(t.date) ?? {done:0,total:0}; s.total++; if (t.done) s.done++; by.set(t.date, s);} return by; }, [all]);
  return { all, add, toggle, remove, tasksFor, stats };
}
