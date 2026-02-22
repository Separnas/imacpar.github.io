
'use client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { format, parse, addDays, startOfWeek } from 'date-fns'
import type { Task, Goal, RecurringTask, SleepEntry } from './types'

const LS_TASKS = 'mindag.tasks'
const LS_GOALS = 'mindag.goals'
const LS_RECUR = 'mindag.recurring'
const LS_SLEEP = 'mindag.sleep'

function todayISO() { return format(new Date(), 'yyyy-MM-dd') }
function parseISO(d: string) { return parse(d, 'yyyy-MM-dd', new Date()) }

export function useScheduler() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === 'undefined') return []
    try { return JSON.parse(localStorage.getItem(LS_TASKS) || '[]') } catch { return [] }
  })
  const [goals, setGoals] = useState<Goal[]>(() => {
    if (typeof window === 'undefined') return []
    try { return JSON.parse(localStorage.getItem(LS_GOALS) || '[]') } catch { return [] }
  })
  const [recurringTasks, setRecurringTasks] = useState<RecurringTask[]>(() => {
    if (typeof window === 'undefined') return []
    try { return JSON.parse(localStorage.getItem(LS_RECUR) || '[]') } catch { return [] }
  })
  const [sleepEntries, setSleepEntries] = useState<SleepEntry[]>(() => {
    if (typeof window === 'undefined') return []
    try { return JSON.parse(localStorage.getItem(LS_SLEEP) || '[]') } catch { return [] }
  })

  useEffect(() => { if (typeof window !== 'undefined') localStorage.setItem(LS_TASKS, JSON.stringify(tasks)) }, [tasks])
  useEffect(() => { if (typeof window !== 'undefined') localStorage.setItem(LS_GOALS, JSON.stringify(goals)) }, [goals])
  useEffect(() => { if (typeof window !== 'undefined') localStorage.setItem(LS_RECUR, JSON.stringify(recurringTasks)) }, [recurringTasks])
  useEffect(() => { if (typeof window !== 'undefined') localStorage.setItem(LS_SLEEP, JSON.stringify(sleepEntries)) }, [sleepEntries])

  const todayTasks = useMemo(() => tasks.filter(t => t.date === todayISO()), [tasks])
  const completedToday = useMemo(() => todayTasks.filter(t => t.completed).length, [todayTasks])

  const addTask = useCallback((title: string, date: string) => {
    const id = crypto.randomUUID()
    setTasks(prev => [...prev, { id, title, date, completed: false }])
  }, [])
  const removeTask = useCallback((id: string) => { setTasks(prev => prev.filter(t => t.id !== id)) }, [])
  const toggleTask = useCallback((id: string) => { setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)) }, [])

  const addGoal = useCallback((title: string) => { const id = crypto.randomUUID(); setGoals(prev => [...prev, { id, title, progress: 0 }]) }, [])
  const removeGoal = useCallback((id: string) => { setGoals(prev => prev.filter(g => g.id !== id)) }, [])
  const updateGoalProgress = useCallback((id: string, progress: number) => { setGoals(prev => prev.map(g => g.id === id ? { ...g, progress } : g)) }, [])

  const addRecurringTask = useCallback((title: string, frequency: RecurringTask['frequency']) => {
    const id = crypto.randomUUID(); setRecurringTasks(prev => [...prev, { id, title, frequency }])
  }, [])
  const removeRecurringTask = useCallback((id: string) => { setRecurringTasks(prev => prev.filter(r => r.id !== id)) }, [])

  const getTasksForDate = useCallback((isoDate: string) => {
    const d = parseISO(isoDate)
    const weekday = d.getDay()
    setTasks(prev => {
      const existingTitles = new Set(prev.filter(t => t.date === isoDate).map(t => t.title))
      const toAdd: Task[] = []
      for (const r of recurringTasks) {
        let match = false
        if (r.frequency === 'daily') match = true
        if (r.frequency === 'weekly' && weekday === 1) match = true
        if (r.frequency === 'monthly' && d.getDate() === 1) match = true
        if (match && !existingTitles.has(r.title)) {
          toAdd.push({ id: crypto.randomUUID(), title: r.title, date: isoDate, completed: false })
        }
      }
      if (toAdd.length === 0) return prev
      return [...prev, ...toAdd]
    })
  }, [recurringTasks])

  // Sleep helpers
  const setSleep = useCallback((date: string, bedtime: string, wake: string) => {
    function minutesBetween(bt: string, wk: string){
      const [bh,bm] = bt.split(':').map(Number); const [wh,wm] = wk.split(':').map(Number);
      let s = bh*60+bm; let e = wh*60+wm; if (e <= s) e += 24*60; return e-s
    }
    const durationMinutes = minutesBetween(bedtime, wake)
    setSleepEntries(prev => {
      const rest = prev.filter(e => e.date != date)
      return [...rest, { date, bedtime, wake, durationMinutes }]
    })
  }, [])

  const removeSleep = useCallback((date: string) => {
    setSleepEntries(prev => prev.filter(e => e.date !== date))
  }, [])

  const getSleep = useCallback((date: string) => {
    return sleepEntries.find(e => e.date === date) || null
  }, [sleepEntries])

  const getSleepWeek = useCallback((date: string) => {
    const d = parseISO(date)
    const start = startOfWeek(d, { weekStartsOn: 1 })
    return Array.from({ length: 7 }).map((_, i) => {
      const day = addDays(start, i)
      const iso = format(day, 'yyyy-MM-dd')
      const found = sleepEntries.find(e => e.date === iso)
      return { date: iso, minutes: found?.durationMinutes ?? 0 }
    })
  }, [sleepEntries])

  return {
    tasks, todayTasks, completedToday,
    addTask, removeTask, toggleTask,
    goals, addGoal, removeGoal, updateGoalProgress,
    recurringTasks, addRecurringTask, removeRecurringTask,
    getTasksForDate,
    sleepEntries, setSleep, removeSleep, getSleep, getSleepWeek,
  }
}
