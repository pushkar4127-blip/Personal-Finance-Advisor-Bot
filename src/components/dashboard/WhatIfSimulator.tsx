import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { whatIfProjection, monthsBetween } from '@/lib/budget'
import { formatCurrency } from '@/lib/currency'
import type { BudgetSummary } from '@/lib/budget'
import type { FinancialPlanInput } from '@/lib/types'

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  formatted,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  formatted: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="font-semibold text-gray-900">{formatted}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-100 accent-indigo-600"
      />
    </div>
  )
}

export function WhatIfSimulator({ plan, summary }: { plan: FinancialPlanInput; summary: BudgetSummary }) {
  const { currency } = plan
  const [income, setIncome] = useState(summary.totalIncome)
  const [expenses, setExpenses] = useState(summary.totalExpenses)
  const [savings, setSavings] = useState(summary.suggestedSavings)

  const baseline = whatIfProjection({
    income: summary.totalIncome,
    expenses: summary.totalExpenses,
    savings: summary.suggestedSavings,
    currentSavings: plan.currentSavings,
    targetAmount: plan.targetAmount,
  })

  const projected = whatIfProjection({
    income,
    expenses,
    savings,
    currentSavings: plan.currentSavings,
    targetAmount: plan.targetAmount,
  })

  const monthDelta =
    baseline.monthsToGoal != null && projected.monthsToGoal != null ? baseline.monthsToGoal - projected.monthsToGoal : null

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4.5 w-4.5 text-indigo-600" />
        <h3 className="text-base font-semibold text-gray-900">What If?</h3>
      </div>
      <p className="mt-1 text-sm text-gray-500">Adjust your numbers to see how they change your outlook.</p>

      <div className="mt-6 space-y-6">
        <Slider
          label="Monthly income"
          value={income}
          min={0}
          max={Math.max(summary.totalIncome * 2, 10000)}
          step={500}
          onChange={setIncome}
          formatted={formatCurrency(income, currency)}
        />
        <Slider
          label="Monthly expenses"
          value={expenses}
          min={0}
          max={Math.max(summary.totalExpenses * 2, 10000)}
          step={500}
          onChange={setExpenses}
          formatted={formatCurrency(expenses, currency)}
        />
        <Slider
          label="Monthly savings"
          value={savings}
          min={0}
          max={Math.max(income, 10000)}
          step={250}
          onChange={setSavings}
          formatted={formatCurrency(savings, currency)}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 rounded-xl bg-gray-50 p-4 sm:grid-cols-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">New available balance</p>
          <p className="mt-1 text-base font-bold text-gray-900">{formatCurrency(projected.balance, currency)}</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">New savings rate</p>
          <p className="mt-1 text-base font-bold text-gray-900">{Math.round(projected.savingsRate * 100)}%</p>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Estimated time to goal</p>
          <p className="mt-1 text-base font-bold text-gray-900">
            {projected.monthsToGoal != null ? monthsBetween(projected.monthsToGoal) : '—'}
          </p>
        </div>
      </div>

      {monthDelta != null && monthDelta !== 0 && (
        <p className="mt-4 rounded-lg bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-700">
          {monthDelta > 0
            ? `You could reach your goal approximately ${monthsBetween(monthDelta)} earlier.`
            : `This scenario would delay your goal by approximately ${monthsBetween(Math.abs(monthDelta))}.`}
        </p>
      )}
      <p className="mt-3 text-xs text-gray-400">Estimates only, based on the numbers above staying consistent every month.</p>
    </div>
  )
}
