
'use client';
export default function ProgressRing({ done, total }:{done:number,total:number}) {
  const r = 26, c = 2*Math.PI*r;
  const pct = total === 0 ? 0 : Math.round((done/total)*100);
  const dash = (pct/100)*c;
  return (
    <div className="flex items-center gap-3 justify-center my-4">
      <svg width="64" height="64" viewBox="0 0 64 64">
        <circle cx="32" cy="32" r={r} stroke="#eee" strokeWidth="8" fill="none" />
        <circle cx="32" cy="32" r={r} stroke="url(#grad)" strokeWidth="8" fill="none" strokeDasharray={`${dash} ${c-dash}`} strokeLinecap="round" transform="rotate(-90 32 32)" />
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--primary)"/>
            <stop offset="100%" stopColor="var(--primary-2)"/>
          </linearGradient>
        </defs>
      </svg>
      <div>
        <div className="text-xl font-semibold">{done}/{total}</div>
        <div className="text-sm text-slate-500">uppgifter klara</div>
      </div>
    </div>
  );
}
