import { createFileRoute } from '@tanstack/react-router'
import { useFinancialPlan } from '@/context/financial-plan-context'
import { computeBudgetSummary } from '@/lib/budget'
import { SavingSuggestions } from '@/components/dashboard/SavingSuggestions'
import { WhatIfSimulator } from '@/components/dashboard/WhatIfSimulator'

export const Route = createFileRoute('/dashboard/savings')({
  component: SavingsPage,
})

function SavingsPage() {
  const { plan } = useFinancialPlan()
  if (!plan) return null

  const summary = computeBudgetSummary(plan)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Savings</h1>
        <p className="mt-1 text-sm text-gray-500">Personalized suggestions and a simulator to explore scenarios.</p>
      </div>

      <SavingSuggestions plan={plan} />
      <WhatIfSimulator plan={plan} summary={summary} />
    </div>
  )
}
