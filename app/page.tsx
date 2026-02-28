```tsx
'use client';

import { useMemo, useState } from 'react';
import Header from '../components/Header';
import QuoteBanner from '../components/QuoteBanner';
import ProgressRing from '../components/ProgressRing';
import Tabs from '../components/Tabs';
import WeekStrip from '../components/WeekStrip';
import TaskList from '../components/TaskList';
import NewTaskModal from '../components/NewTaskModal';
import ReminderCard from '../components/ReminderCard';
import UserGate from '../components/UserGate';
import { fmt, ymd } from '../lib/date';
import { useUser } from '../hooks/useUser';
import { useTasks } from '../hooks/useTasks';

export default function Page() {
  const [date, setDate] = useState(new Date());
  const [tab, setTab] = useState<'schema' | 'sömn' | 'mål'>('schema');
  const [open, setOpen] = useState(false);

  const { user } = useUser();
  const { tasksFor, add, toggle, remove, stats } = useTasks(user ?? 'anon');

  const todayKey = ymd(date);
  const list = tasksFor(todayKey);

  const { done, total } = useMemo(() => {
    const s = stats.get(todayKey) ?? { done: 0, total: 0 };
    return { done: s.done, total: s.total };
  }, [stats, todayKey]);

  return (
    <UserGate>
      <div className="mx-auto max-w-xl px-4 pb-16">
        <Header />
        <QuoteBanner />
        <div className="mt-2 flex items-center justify-center">
          <ProgressRing done={done} total={total} />
        </div>
        <Tabs tab={tab} setTab={setTab} />
        <WeekStrip date={date} setDate={setDate} />
        <div className="text-center mt-4 mb-2 text-sm text-slate-600">
          <span className="font-medium">
            {fmt(date, 'EEEE d MMMM')}
          </span>
        </div>
        {tab === 'schema' ? (
          <TaskList tasks={list} onToggle={toggle} onDelete={remove} />
        ) : null}
        <div className="flex justify-center mt-5">
          <button
            className="px-5 py-2 rounded-full bg-[var(--primary)] text-white shadow"
            onClick={() => setOpen(true)}
          >
            + Ny uppgift
          </button>
        </div>
        <NewTaskModal
          open={open}
          setOpen={setOpen}
          date={date}
          add={add}
        />
        <ReminderCard />
      </div>
    </UserGate>
  );
}
```
