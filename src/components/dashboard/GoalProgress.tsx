import { Target } from 'lucide-react'
import { formatCurrency } from '@/lib/currency'
import { monthsBetween } from '@/lib/budget'
import type { Currency } from '@/lib/types'

export function GoalProgress({
  goal,
  currentSavings,
  targetAmount,
  progressPct,
  monthsToGoal,
  currency,
}: {
  goal: string
  currentSavings: number
  targetAmount: number
  progressPct: number
  monthsToGoal: number | null
  currency: Currency
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <Target className="h-4.5 w-4.5 text-indigo-600" />
        <h3 className="text-sm font-semibold text-gray-900">Savings Goal: {goal}</h3>
      </div>
      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-lg font-bold text-gray-900">{formatCurrency(currentSavings, currency)}</span>
        <span className="text-sm text-gray-400">of {formatCurrency(targetAmount, currency)}</span>
      </div>
      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all"
          style={{ width: `${Math.min(100, Math.max(0, progressPct))}%` }}
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
        <span>{progressPct}% complete</span>
        {monthsToGoal != null && <span>~{monthsBetween(monthsToGoal)} to go (estimated)</span>}
      </div>
    </div>
  )
}
