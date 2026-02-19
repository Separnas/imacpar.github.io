
'use client'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'

export type SleepEntry = { date: string; bedtime: string; wake: string; durationMinutes: number }

function minutesBetween(bedtime: string, wake: string) {
  const [bh, bm] = bedtime.split(':').map(Number)
  const [wh, wm] = wake.split(':').map(Number)
  let start = bh * 60 + bm
  let end = wh * 60 + wm
  if (end <= start) end += 24 * 60 // över midnatt
  return end - start
}

export function SleepTracker({ date, entry, onSave, onRemove, week }: {
  date: string
  entry: SleepEntry | null
  onSave: (date: string, bedtime: string, wake: string) => void
  onRemove: (date: string) => void
  week: { date: string; minutes: number }[]
}) {
  const [bedtime, setBedtime] = useState(entry?.bedtime ?? '22:30')
  const [wake, setWake] = useState(entry?.wake ?? '06:30')
  const minutes = useMemo(() => minutesBetween(bedtime, wake), [bedtime, wake])
  const hours = Math.floor(minutes / 60)
  const restMin = minutes % 60

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border p-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label className="text-sm font-medium">Läggdags</label>
            <input type="time" value={bedtime} onChange={e => setBedtime(e.target.value)} className="block rounded-md border px-2 py-1" />
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium">Uppstigning</label>
            <input type="time" value={wake} onChange={e => setWake(e.target.value)} className="block rounded-md border px-2 py-1" />
          </div>
        </div>
        <div className="pt-3 text-sm text-muted-foreground">Sömn: <strong className="text-foreground">{hours} h {restMin} min</strong></div>
        <div className="flex justify-end gap-2 pt-3">
          {entry && <Button variant="ghost" onClick={() => onRemove(date)}>Rensa</Button>}
          <Button onClick={() => onSave(date, bedtime, wake)}>Spara</Button>
        </div>
      </div>

      <div className="rounded-2xl border p-4 space-y-2">
        <p className="font-semibold text-sm">Vecka – sömn (mål: 8h)</p>
        <div className="grid grid-cols-7 gap-2">
          {week.map((d) => {
            const h = Math.min(100, Math.round((d.minutes / (8*60)) * 100))
            return (
              <div key={d.date} className="flex flex-col items-center gap-1">
                <div className="w-8 h-24 bg-accent/40 rounded-md flex items-end">
                  <div className="w-full bg-primary rounded-sm" style={{ height: `${h}%` }} />
                </div>
                <div className="text-[10px] opacity-70">{new Date(d.date).getDate()}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
