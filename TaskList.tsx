
'use client'
import { useState, useEffect, useMemo, useCallback } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { EncouragingMessage } from '@/components/EncouragingMessage'
import { AddTaskDialog } from '@/components/AddTaskDialog'
import { TaskList } from '@/components/TaskList'
import { GoalsSection } from '@/components/GoalsSection'
import { SleepTracker } from '@/components/SleepTracker'
import { useScheduler } from '@/hooks/useScheduler'
import { format, parse, addDays } from 'date-fns'
import { sv } from 'date-fns/locale'
import { Button } from '@/components/ui/button'
import { WeekOverview } from '@/components/WeekOverview'
import { formatLocalDate, parseLocalDate } from '@/lib/dateUtils'

function todayLocalISO() { return formatLocalDate(new Date()) }
function shiftISODate(baseISO: string, days: number) {
  const d = parseLocalDate(baseISO)
  const shifted = addDays(d, days)
  return formatLocalDate(shifted)
}
function prettyDate(isoDate: string, locale = sv) {
  const d = parseLocalDate(isoDate)
  return format(d, 'EEEE d MMMM', { locale })
}

export default function Page() {
  const { tasks, addTask, removeTask, toggleTask, goals, addGoal, removeGoal, updateGoalProgress, addRecurringTask, getTasksForDate, setSleep, removeSleep, getSleep, getSleepWeek } = useScheduler()

  const [selectedDate, setSelectedDate] = useState<string>(() => todayLocalISO())

  useEffect(() => { getTasksForDate(selectedDate) }, [selectedDate, getTasksForDate])

  const dateTasks = useMemo(() => tasks.filter(t => t.date === selectedDate), [tasks, selectedDate])
  const dateCompleted = useMemo(() => dateTasks.filter(t => t.completed).length, [dateTasks])
  const isToday = selectedDate === todayLocalISO()
  const shiftDate = useCallback((days: number) => setSelectedDate(prev => shiftISODate(prev, days)), [])
  const formattedDate = prettyDate(selectedDate, sv)

  const r = 15.5
  const circumference = 2 * Math.PI * r
  const progressDash = dateTasks.length > 0 ? (dateCompleted / dateTasks.length) * circumference : 0

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md px-4 py-6 space-y-5">
        <header className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Min Dag ✨</h1>
          <p className="text-sm text-muted-foreground">Din personliga schemaläggare</p>
        </header>

        <EncouragingMessage total={dateTasks.length} completed={dateCompleted} />

        {dateTasks.length > 0 && (
          <div className="flex items-center justify-center gap-3">
            <div className="relative h-16 w-16">
              <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90" aria-hidden="true">
                <circle cx="18" cy="18" r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="3" />
                <circle cx="18" cy="18" r={r} fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" strokeDasharray={`${progressDash} ${circumference}`} className="transition-all duration-500" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-bold" aria-live="polite">{dateCompleted}/{dateTasks.length}</span>
            </div>
            <p className="text-sm text-muted-foreground font-medium">uppgifter klara</p>
          </div>
        )}

        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="w-full rounded-full">
            <TabsTrigger value="tasks" className="flex-1 rounded-full">📋 Schema</TabsTrigger>
            <TabsTrigger value="sleep" className="flex-1 rounded-full">😴 Sömn</TabsTrigger>
            <TabsTrigger value="goals" className="flex-1 rounded-full">🎯 Mål</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4 mt-4">
            <WeekOverview tasks={tasks as any} selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => shiftDate(-1)} aria-label="Föregående dag" title="Föregående dag"><span aria-hidden>‹</span></Button>
              <button onClick={() => setSelectedDate(todayLocalISO())} className="font-semibold capitalize hover:text-primary transition-colors" aria-label="Gå till idag" title="Gå till idag">{isToday ? `Idag – ${formattedDate}` : formattedDate}</button>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={() => shiftDate(1)} aria-label="Nästa dag" title="Nästa dag"><span aria-hidden>›</span></Button>
            </div>
            <TaskList tasks={dateTasks as any} onToggle={toggleTask} onRemove={removeTask} />
            <div className="flex justify-center pt-2"><AddTaskDialog onAdd={addTask} onAddRecurring={addRecurringTask} selectedDate={selectedDate} /></div>
          </TabsContent>

          <TabsContent value="sleep" className="mt-4">
            <SleepTracker date={selectedDate} entry={getSleep(selectedDate) as any} onSave={setSleep} onRemove={removeSleep} week={getSleepWeek(selectedDate)} />
          </TabsContent>

          <TabsContent value="goals" className="mt-4">
            <GoalsSection goals={goals as any} onAdd={addGoal} onRemove={removeGoal} onUpdateProgress={updateGoalProgress} />
          </TabsContent>
        </Tabs>

        <div className="rounded-2xl bg-accent/30 p-4 space-y-2">
          <p className="font-bold text-sm">💡 Kom ihåg!</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>🥤 Drick vatten regelbundet</li>
            <li>🍎 Ät frukt &amp; grönsaker</li>
            <li>😴 Sov minst 8 timmar</li>
            <li>📵 Skärmfri tid innan läggdags</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
