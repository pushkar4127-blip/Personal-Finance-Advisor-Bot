import { FileText, TrendingUp, ThumbsUp, AlertCircle, ArrowRight } from 'lucide-react'
import { generateMonthlySummary } from '@/lib/aiFixtures'
import type { FinancialPlanInput } from '@/lib/types'

export function MonthlySummaryCard({ plan }: { plan: FinancialPlanInput }) {
  const summary = generateMonthlySummary(plan)

  const rows = [
    { icon: TrendingUp, label: 'Biggest spending category', text: summary.biggestCategory },
    { icon: FileText, label: 'Savings progress', text: summary.savingsProgress },
    { icon: ThumbsUp, label: 'Positive observation', text: summary.positive },
    { icon: AlertCircle, label: 'Area to improve', text: summary.improve },
    { icon: ArrowRight, label: "Next month's focus", text: summary.nextFocus },
  ]

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <h3 className="text-base font-semibold text-gray-900">AI Monthly Summary</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{summary.headline}</p>

      <div className="mt-5 space-y-4">
        {rows.map((row) => (
          <div key={row.label} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <row.icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{row.label}</p>
              <p className="text-sm text-gray-700">{row.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
