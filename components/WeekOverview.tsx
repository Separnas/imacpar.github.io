
'use client'
import { addDays, startOfWeek, format, parse } from 'date-fns'
import { sv } from 'date-fns/locale'
import type { TaskItem } from './TaskList'

export function WeekOverview({ tasks, selectedDate, onSelectDate }: {
  tasks: TaskItem[]
  selectedDate: string
  onSelectDate: (iso: string) => void
}) {
  const base = parse(selectedDate, 'yyyy-MM-dd', new Date())
  const start = startOfWeek(base, { weekStartsOn: 1 })
  const days = Array.from({ length: 7 }).map((_, i) => addDays(start, i))

  const byDate = new Map<string, { total: number; completed: number }>()
  for (const t of tasks) {
    const curr = byDate.get(t.date) || { total: 0, completed: 0 }
    curr.total += 1
    if (t.completed) curr.completed += 1
    byDate.set(t.date, curr)
  }

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((d) => {
        const iso = format(d, 'yyyy-MM-dd')
        const info = byDate.get(iso) || { total: 0, completed: 0 }
        const isSelected = iso === selectedDate
        const isToday = iso === format(new Date(), 'yyyy-MM-dd')
        return (
          <button key={iso} onClick={() => onSelectDate(iso)} className={'rounded-xl border p-2 text-center text-xs space-y-1 ' + (isSelected ? 'bg-primary text-primary-foreground' : 'bg-background')} title={`${info.completed}/${info.total} klara`}>
            <div className="capitalize">{format(d, 'EEE', { locale: sv })}</div>
            <div className="text-base font-semibold">{format(d, 'd')}</div>
            <div className="opacity-80">{info.completed}/{info.total}</div>
            {isToday && <div className="text-[10px]">idag</div>}
          </button>
        )
      })}
    </div>
  )
}
