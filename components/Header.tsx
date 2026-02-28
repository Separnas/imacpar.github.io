
'use client';
import { useUser } from '../hooks/useUser';
export default function Header() {
  const { user, setUser } = useUser();
  return (
    <header className="py-8 text-center">
      <div className="text-2xl font-bold text-[var(--primary)]">Min Dag ✨</div>
      <div className="text-sm text-slate-500">Din personliga schemaläggare</div>
      <div className="mt-3 text-sm text-slate-600 flex items-center justify-center gap-2">
        <span>Användare:</span>
        <input className="border rounded-full px-3 py-1 text-sm" value={user ?? ''} onChange={(e) => setUser(e.target.value)} />
      </div>
    </header>
  );
}
