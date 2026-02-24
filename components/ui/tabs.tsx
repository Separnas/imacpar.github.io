
'use client'
import * as React from 'react'
import { cn } from '@/lib/cn'

type TabsContextType = { value: string; setValue: (v: string) => void }
const TabsContext = React.createContext<TabsContextType | null>(null)

export function Tabs({ defaultValue, className, children }: { defaultValue: string; className?: string; children: React.ReactNode }) {
  const [value, setValue] = React.useState(defaultValue)
  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}
export function TabsList({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div role="tablist" className={cn('flex gap-2 bg-accent/40 p-1', className)}>{children}</div>
}
export function TabsTrigger({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(TabsContext)!
  const active = ctx.value === value
  return (
    <button role="tab" aria-selected={active} onClick={() => ctx.setValue(value)} className={cn('px-4 py-2 text-sm rounded-full', active ? 'bg-background shadow font-semibold' : 'opacity-70 hover:opacity-100', className)}>
      {children}
    </button>
  )
}
export function TabsContent({ value, className, children }: { value: string; className?: string; children: React.ReactNode }) {
  const ctx = React.useContext(TabsContext)!
  if (ctx.value !== value) return null
  return <div className={className}>{children}</div>
}
