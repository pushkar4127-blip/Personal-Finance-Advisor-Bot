import { createFileRoute } from '@tanstack/react-router'
import { useFinancialPlan } from '@/context/financial-plan-context'
import { computeBudgetSummary } from '@/lib/budget'
import { SummaryCards } from '@/components/dashboard/SummaryCards'
import { IncomeExpenseBar } from '@/components/dashboard/IncomeExpenseBar'
import { CashFlowChart } from '@/components/dashboard/CashFlowChart'
import { MonthlySummaryCard } from '@/components/dashboard/MonthlySummaryCard'

export const Route = createFileRoute('/dashboard/')({
  component: DashboardOverview,
})

function DashboardOverview() {
  const { plan } = useFinancialPlan()
  if (!plan) return null

  const summary = computeBudgetSummary(plan)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Here's a snapshot of your finances this month.</p>
      </div>

      <SummaryCards summary={summary} currency={plan.currency} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-900">Income vs Expenses</h2>
          <div className="mt-4">
            <IncomeExpenseBar income={summary.totalIncome} expenses={summary.totalExpenses} currency={plan.currency} />
          </div>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-900">Projected Cash Flow (next 12 months)</h2>
          <div className="mt-4">
            <CashFlowChart currentSavings={plan.currentSavings} monthlySavings={summary.suggestedSavings} currency={plan.currency} />
          </div>
        </div>
      </div>

      <MonthlySummaryCard plan={plan} />
    </div>
  )
}
