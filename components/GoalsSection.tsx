
'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export type Goal = { id: string; title: string; progress: number }

export function GoalsSection({ goals, onAdd, onRemove, onUpdateProgress }: {
  goals: Goal[]
  onAdd: (title: string) => void
  onRemove: (id: string) => void
  onUpdateProgress: (id: string, progress: number) => void
}) {
  const [title, setTitle] = useState('')
  const submit = () => { if (!title.trim()) return; onAdd(title.trim()); setTitle('') }
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input className="flex-1 rounded-md border px-3 py-2 text-sm" value={title} onChange={e => setTitle(e.target.value)} placeholder="Nytt mål" />
        <Button onClick={submit}>Lägg till</Button>
      </div>
      {goals.length === 0 ? <p className="text-sm text-muted-foreground">Inga mål ännu.</p> : (
        <ul className="space-y-3">
          {goals.map(g => (
            <li key={g.id} className="rounded-xl border p-3 space-y-2">
              <div className="flex items-center gap-2">
                <strong className="flex-1">{g.title}</strong>
                <Button variant="ghost" onClick={() => onRemove(g.id)}>Ta bort</Button>
              </div>
              <div className="flex items-center gap-3">
                <input type="range" min={0} max={100} value={g.progress} onChange={e => onUpdateProgress(g.id, Number(e.target.value))} className="w-full" />
                <span className="text-sm w-10 text-right">{g.progress}%</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
