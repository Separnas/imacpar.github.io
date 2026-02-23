
'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function AddTaskDialog({ onAdd, onAddRecurring, selectedDate }: {
  onAdd: (title: string, date: string) => void
  onAddRecurring: (title: string, frequency: 'daily' | 'weekly' | 'monthly') => void
  selectedDate: string
}) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [recurring, setRecurring] = useState(false)
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly'>('daily')

  const submit = () => {
    if (!title.trim()) return
    if (recurring) onAddRecurring(title.trim(), frequency)
    else onAdd(title.trim(), selectedDate)
    setTitle('')
    setRecurring(false)
    setOpen(false)
  }

  return (
    <div className="w-full">
      {open ? (
        <div className="w-full rounded-2xl border p-4 bg-background space-y-3">
          <div className="space-y-1">
            <label className="text-sm font-medium">Titel</label>
            <input className="w-full rounded-md border px-3 py-2 text-sm" value={title} onChange={e => setTitle(e.target.value)} placeholder="Vad behöver göras?" />
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={recurring} onChange={e => setRecurring(e.target.checked)} />
              Återkommande
            </label>
            {recurring && (
              <select className="rounded-md border px-2 py-1 text-sm" value={frequency} onChange={e => setFrequency(e.target.value as any)}>
                <option value="daily">Dagligen</option>
                <option value="weekly">Veckovis (mån)</option>
                <option value="monthly">Månadsvis (1:a)</option>
              </select>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>Avbryt</Button>
            <Button onClick={submit}>Lägg till</Button>
          </div>
        </div>
      ) : (
        <Button onClick={() => setOpen(true)}>➕ Lägg till</Button>
      )}
    </div>
  )
}
