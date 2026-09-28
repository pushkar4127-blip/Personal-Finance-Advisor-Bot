import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { FinancialPlanInput } from '@/lib/types'

const STORAGE_KEY = 'finwise:plan'

interface FinancialPlanContextValue {
  plan: FinancialPlanInput | null
  ready: boolean
  setPlan: (plan: FinancialPlanInput) => void
  clearPlan: () => void
}

const FinancialPlanContext = createContext<FinancialPlanContextValue | null>(null)

export function FinancialPlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlanState] = useState<FinancialPlanInput | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setPlanState(JSON.parse(raw) as FinancialPlanInput)
    } catch {
      // Corrupted or unavailable storage — fall back to no saved plan.
    }
    setReady(true)
  }, [])

  const setPlan = (next: FinancialPlanInput) => {
    setPlanState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Storage unavailable (e.g. private browsing) — plan still works this session.
    }
  }

  const clearPlan = () => {
    setPlanState(null)
    try {
      window.localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  return (
    <FinancialPlanContext.Provider value={{ plan, ready, setPlan, clearPlan }}>
      {children}
    </FinancialPlanContext.Provider>
  )
}

export function useFinancialPlan() {
  const ctx = useContext(FinancialPlanContext)
  if (!ctx) throw new Error('useFinancialPlan must be used within a FinancialPlanProvider')
  return ctx
}
