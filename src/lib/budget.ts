import type { FinancialPlanInput, RiskPreference } from './types'

export interface CategoryAmount {
  label: string
  amount: number
}

export interface BudgetSummary {
  totalIncome: number
  needsTotal: number
  wantsTotal: number
  totalExpenses: number
  availableBalance: number
  suggestedSavings: number
  savingsRate: number
  needsBreakdown: CategoryAmount[]
  wantsBreakdown: CategoryAmount[]
  monthsToGoal: number | null
  goalProgressPct: number
  isOverspending: boolean
}

const SAVINGS_RATE_BY_RISK: Record<RiskPreference, number> = {
  conservative: 0.25,
  balanced: 0.2,
  aggressive: 0.15,
}

export function computeBudgetSummary(plan: FinancialPlanInput): BudgetSummary {
  const { expenses } = plan
  const totalIncome = plan.monthlyIncome + plan.otherIncome

  const needsBreakdown: CategoryAmount[] = [
    { label: 'Housing', amount: expenses.housing },
    { label: 'Food', amount: expenses.food },
    { label: 'Transportation', amount: expenses.transportation },
    { label: 'Utilities', amount: expenses.utilities },
    { label: 'Healthcare', amount: expenses.healthcare },
    { label: 'Education', amount: expenses.education },
  ].filter((item) => item.amount > 0)

  const wantsBreakdown: CategoryAmount[] = [
    { label: 'Entertainment', amount: expenses.entertainment },
    { label: 'Shopping', amount: expenses.shopping },
    { label: 'Other', amount: expenses.other },
    ...expenses.custom
      .filter((item) => item.amount > 0)
      .map((item) => ({ label: item.label || 'Custom expense', amount: item.amount })),
  ].filter((item) => item.amount > 0)

  const needsTotal = needsBreakdown.reduce((sum, item) => sum + item.amount, 0)
  const wantsTotal = wantsBreakdown.reduce((sum, item) => sum + item.amount, 0)
  const totalExpenses = needsTotal + wantsTotal
  const availableBalance = totalIncome - totalExpenses
  const isOverspending = availableBalance < 0

  const targetRate = SAVINGS_RATE_BY_RISK[plan.riskPreference]
  const suggestedSavings = isOverspending
    ? 0
    : Math.max(0, Math.min(Math.round((totalIncome * targetRate) / 50) * 50, Math.round(availableBalance)))

  const savingsRate = totalIncome > 0 ? suggestedSavings / totalIncome : 0

  const remaining = Math.max(plan.targetAmount - plan.currentSavings, 0)
  const monthsToGoal = suggestedSavings > 0 ? Math.ceil(remaining / suggestedSavings) : null
  const goalProgressPct =
    plan.targetAmount > 0 ? Math.min(100, Math.round((plan.currentSavings / plan.targetAmount) * 100)) : 0

  return {
    totalIncome,
    needsTotal,
    wantsTotal,
    totalExpenses,
    availableBalance,
    suggestedSavings,
    savingsRate,
    needsBreakdown,
    wantsBreakdown,
    monthsToGoal,
    goalProgressPct,
    isOverspending,
  }
}

export interface WhatIfInput {
  income: number
  expenses: number
  savings: number
  currentSavings: number
  targetAmount: number
}

export interface WhatIfResult {
  balance: number
  savingsRate: number
  monthsToGoal: number | null
}

export function whatIfProjection({ income, expenses, savings, currentSavings, targetAmount }: WhatIfInput): WhatIfResult {
  const balance = income - expenses
  const savingsRate = income > 0 ? savings / income : 0
  const remaining = Math.max(targetAmount - currentSavings, 0)
  const monthsToGoal = savings > 0 ? Math.ceil(remaining / savings) : null
  return { balance, savingsRate, monthsToGoal }
}

export function monthsBetween(months: number): string {
  if (months <= 0) return 'less than a month'
  if (months === 1) return '1 month'
  if (months < 12) return `${months} months`
  const years = Math.floor(months / 12)
  const rest = months % 12
  const yearLabel = `${years} year${years === 1 ? '' : 's'}`
  if (rest === 0) return yearLabel
  return `${yearLabel} ${rest} month${rest === 1 ? '' : 's'}`
}
