import { Sparkles } from 'lucide-react'
import { generateSavingSuggestions } from '@/lib/aiFixtures'
import type { FinancialPlanInput } from '@/lib/types'

const PRIORITY_CLASSES: Record<string, string> = {
  High: 'bg-red-50 text-red-700 border-red-100',
  Medium: 'bg-amber-50 text-amber-700 border-amber-100',
  Low: 'bg-slate-100 text-slate-600 border-slate-200',
}

export function SavingSuggestions({ plan }: { plan: FinancialPlanInput }) {
  const suggestions = generateSavingSuggestions(plan)

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4.5 w-4.5 text-indigo-600" />
        <h3 className="text-base font-semibold text-gray-900">AI Saving Suggestions</h3>
      </div>
      <p className="mt-1 text-sm text-gray-500">Personalized ideas based on your income and spending pattern.</p>

      <div className="mt-5 space-y-3">
        {suggestions.map((suggestion) => (
          <div key={suggestion.title} className="rounded-xl border border-gray-100 p-4">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h4 className="text-sm font-semibold text-gray-900">{suggestion.title}</h4>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${PRIORITY_CLASSES[suggestion.priority]}`}
              >
                {suggestion.priority} priority
              </span>
            </div>
            <p className="mt-1.5 text-sm leading-relaxed text-gray-500">{suggestion.explanation}</p>
            <p className="mt-2 text-sm font-semibold text-emerald-700">Potential saving: {suggestion.impact}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
