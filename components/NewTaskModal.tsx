
'use client';
import { useState } from 'react';
import { ymd } from '../lib/date';
export default function NewTaskModal({ open, onClose, onCreate, date }:{ open: boolean; onClose: ()=>void; onCreate: (t:{title:string,time?:string,date:string})=>void; date: Date; }) {
  const [title, setTitle] = useState('');
  const [time, setTime]   = useState('');
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 grid place-items-center z-50">
      <div className="card w-full max-w-md p-5">
        <h2 className="text-lg font-semibold mb-4">Ny uppgift</h2>
        <label className="block text-sm mb-1">Titel</label>
        <input className="w-full border rounded-lg px-3 py-2 mb-3" placeholder="t.ex. Gå med Diesel" value={title} onChange={e=>setTitle(e.target.value)} />
        <label className="block text-sm mb-1">Tid (valfritt)</label>
        <input className="w-full border rounded-lg px-3 py-2 mb-4" type="time" value={time} onChange={e=>setTime(e.target.value)} />
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">Avbryt</button>
          <button onClick={()=>{ const trimmed = title.trim(); if (!trimmed) return; onCreate({ title: trimmed, time: time || undefined, date: ymd(date) }); setTitle(''); setTime(''); onClose(); }} className="px-4 py-2 rounded-lg bg-[var(--primary)] text-white">Spara</button>
        </div>
      </div>
    </div>
  );
}
