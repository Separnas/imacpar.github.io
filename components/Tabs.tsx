
'use client';
export default function Tabs({tab, setTab}:{tab:string, setTab:(t:string)=>void}) {
  const items = [
    { id:'schema', label:'Schema' },
    { id:'sömn',   label:'😴 Sömn' },
    { id:'mål',    label:'🍓 Mål'  },
  ];
  return (
    <div className="segment">
      {items.map(it => (
        <button key={it.id} data-active={String(tab===it.id)} onClick={()=>setTab(it.id)}>{it.label}</button>
      ))}
    </div>
  );
}
