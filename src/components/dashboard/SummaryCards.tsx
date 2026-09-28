import type { LucideIcon } from 'lucide-react'
import { Wallet, Receipt, Scale, PiggyBank } from 'lucide-react'
import type { BudgetSummary } from '@/lib/budget'
import { formatCurrency } from '@/lib/currency'
import type { Currency } from '@/lib/types'

type Tone = 'indigo' | 'slate' | 'emerald' | 'red' | 'violet'

const TONE_CLASSES: Record<Tone, string> = {
  indigo: 'bg-indigo-50 text-indigo-600',
  slate: 'bg-slate-100 text-slate-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  red: 'bg-red-50 text-red-600',
  violet: 'bg-violet-50 text-violet-600',
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
  tone,
}: {
  icon: LucideIcon
  label: string
  value: string
  hint?: string
  tone: Tone
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${TONE_CLASSES[tone]}`}>
          <Icon className="h-5 w-5" />
        </span>
        <p className="text-sm font-medium text-gray-500">{label}</p>
      </div>
      <p className="mt-3 text-2xl font-bold tracking-tight text-gray-900">{value}</p>
      {hint && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
    </div>
  )
}

export function SummaryCards({ summary, currency }: { summary: BudgetSummary; currency: Currency }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard icon={Wallet} label="Monthly Income" value={formatCurrency(summary.totalIncome, currency)} tone="indigo" />
      <StatCard icon={Receipt} label="Total Expenses" value={formatCurrency(summary.totalExpenses, currency)} tone="slate" />
      <StatCard
        icon={Scale}
        label="Available Balance"
        value={formatCurrency(summary.availableBalance, currency)}
        hint={summary.isOverspending ? 'Spending exceeds income' : undefined}
        tone={summary.isOverspending ? 'red' : 'emerald'}
      />
      <StatCard
        icon={PiggyBank}
        label="Suggested Savings"
        value={formatCurrency(summary.suggestedSavings, currency)}
        hint="Estimated recommendation"
        tone="violet"
      />
    </div>
  )
}
