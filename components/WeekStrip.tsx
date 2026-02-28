
'use client';
import { useState } from 'react';
import { addWeeks } from 'date-fns';
import { fmt, weekDays, ymd } from '../lib/date';
export default function WeekStrip({ date, setDate }:{ date: Date, setDate: (d:Date)=>void }) {
  const [anchor, setAnchor] = useState(date);
  const days = weekDays(anchor);
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-2">
        <button className="px-2 py-1 rounded-lg border" onClick={()=>setAnchor(addWeeks(anchor,-1))}>‹</button>
        <div className="text-sm text-slate-500">{fmt(anchor,'LLLL yyyy')}</div>
        <button className="px-2 py-1 rounded-lg border" onClick={()=>setAnchor(addWeeks(anchor,1))}>›</button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {days.map(d => {
          const active = ymd(d) === ymd(date);
          return (
            <button key={d.toISOString()} onClick={()=>setDate(d)} className={`min-w-[64px] text-center rounded-2xl border px-2 py-2 ${active ? 'bg-[var(--primary)] text-white border-transparent' : 'bg-white'}`}>
              <div className="text-xs opacity-80">{fmt(d,'EEE')}</div>
              <div className="text-lg font-semibold leading-tight">{fmt(d,'d')}</div>
              <div className="text-[10px] opacity-80">{fmt(d,'MM')}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
