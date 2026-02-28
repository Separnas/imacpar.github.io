
export default function ReminderCard() {
  return (
    <div className="card p-4 mt-6">
      <div className="font-semibold mb-2">💡 Kom ihåg!</div>
      <ul className="text-sm text-slate-600 space-y-1">
        <li>💧 Drick vatten regelbundet</li>
        <li>🥦 Ät frukt & grönsaker</li>
        <li>😴 Sov minst 8 timmar</li>
        <li>📵 Skärmfri tid innan läggdags</li>
      </ul>
    </div>
  );
}
