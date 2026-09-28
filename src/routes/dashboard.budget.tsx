import { createFileRoute } from '@tanstack/react-router'
import { useFinancialPlan } from '@/context/financial-plan-context'
import { computeBudgetSummary } from '@/lib/budget'
import { formatCurrency } from '@/lib/currency'
import { BudgetDonut } from '@/components/dashboard/BudgetDonut'
import { GoalProgress } from '@/components/dashboard/GoalProgress'

export const Route = createFileRoute('/dashboard/budget')({
  component: BudgetPlan,
})

function CategoryList({ title, items, total, currency }: { title: string; items: { label: string; amount: number }[]; total: number; currency: import('@/lib/types').Currency }) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <span className="text-sm font-semibold text-gray-900">{formatCurrency(total, currency)}</span>
      </div>
      <div className="mt-3 space-y-2">
        {items.length === 0 && <p className="text-sm text-gray-400">No expenses in this category.</p>}
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between text-sm">
            <span className="text-gray-500">{item.label}</span>
            <span className="font-medium text-gray-700">{formatCurrency(item.amount, currency)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function BudgetPlan() {
  const { plan } = useFinancialPlan()
  if (!plan) return null

  const summary = computeBudgetSummary(plan)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Budget Plan</h1>
        <p className="mt-1 text-sm text-gray-500">How your income breaks down across needs, wants, and savings.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-1">
          <h2 className="text-sm font-semibold text-gray-900">Needs vs Wants vs Savings</h2>
          <div className="mx-auto mt-4 max-w-xs">
            <BudgetDonut
              needs={summary.needsTotal}
              wants={summary.wantsTotal}
              savings={summary.suggestedSavings}
              currency={plan.currency}
            />
          </div>
        </div>

        <div className="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm lg:col-span-2">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-sm font-semibold text-gray-900">Income</h3>
              <span className="text-sm font-semibold text-gray-900">{formatCurrency(summary.totalIncome, plan.currency)}</span>
            </div>
          </div>
          <CategoryList title="Needs" items={summary.needsBreakdown} total={summary.needsTotal} currency={plan.currency} />
          <CategoryList title="Wants" items={summary.wantsBreakdown} total={summary.wantsTotal} currency={plan.currency} />
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Savings</h3>
              <p className="text-xs text-gray-400">Recommended monthly savings (estimated)</p>
            </div>
            <span className="text-sm font-semibold text-emerald-700">{formatCurrency(summary.suggestedSavings, plan.currency)}</span>
          </div>
        </div>
      </div>

      <GoalProgress
        goal={plan.financialGoal}
        currentSavings={plan.currentSavings}
        targetAmount={plan.targetAmount}
        progressPct={summary.goalProgressPct}
        monthsToGoal={summary.monthsToGoal}
        currency={plan.currency}
      />
    </div>
  )
}
