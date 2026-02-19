
'use client'
import { Button } from '@/components/ui/button'

export type TaskItem = { id: string; title: string; date: string; completed: boolean }

export function TaskList({ tasks, onToggle, onRemove }: { tasks: TaskItem[]; onToggle: (id: string) => void; onRemove: (id: string) => void }) {
  if (tasks.length === 0) return <p className="text-sm text-muted-foreground text-center">Inga uppgifter för detta datum.</p>
  return (
    <ul className="space-y-2">
      {tasks.map(t => (
        <li key={t.id} className="flex items-center gap-3 rounded-xl border p-3">
          <input type="checkbox" checked={t.completed} onChange={() => onToggle(t.id)} />
          <span className={t.completed ? 'line-through opacity-60' : ''}>{t.title}</span>
          <div className="ml-auto"><Button variant="ghost" onClick={() => onRemove(t.id)} aria-label="Ta bort">🗑️</Button></div>
        </li>
      ))}
    </ul>
  )
}
