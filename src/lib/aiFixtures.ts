import type { FinancialPlanInput } from './types'
import { computeBudgetSummary, monthsBetween } from './budget'
import { formatCurrency } from './currency'

export interface SavingSuggestion {
  title: string
  explanation: string
  impact: string
  priority: 'High' | 'Medium' | 'Low'
}

/**
 * Rule-based stand-in for the Gemini-generated suggestions described in
 * PLAN.md. Deterministic so the demo is reproducible; swapped for a live
 * model call once the backend milestone lands.
 */
export function generateSavingSuggestions(plan: FinancialPlanInput): SavingSuggestion[] {
  const summary = computeBudgetSummary(plan)
  const { currency } = plan
  const suggestions: SavingSuggestion[] = []

  if (summary.isOverspending) {
    suggestions.push({
      title: 'Rebalance Your Monthly Budget',
      explanation: `Your expenses currently exceed your income by ${formatCurrency(Math.abs(summary.availableBalance), currency)}. Review discretionary categories first before touching essentials like housing or food.`,
      impact: `Up to ${formatCurrency(Math.abs(summary.availableBalance), currency)}/month (estimated)`,
      priority: 'High',
    })
  }

  const sortedWants = [...summary.wantsBreakdown].sort((a, b) => b.amount - a.amount)
  const [topWant, secondWant] = sortedWants

  if (topWant) {
    const reduction = Math.round(topWant.amount * 0.2)
    if (reduction > 0) {
      suggestions.push({
        title: `Reduce ${topWant.label} Spending`,
        explanation: `${topWant.label} is your largest discretionary expense. Setting a monthly cap and trimming it by roughly 20% could free up cash for savings without a major lifestyle change.`,
        impact: `${formatCurrency(reduction, currency)}/month (estimated)`,
        priority: 'High',
      })
    }
  }

  if (secondWant) {
    const reduction = Math.round(secondWant.amount * 0.15)
    if (reduction > 0) {
      suggestions.push({
        title: `Trim ${secondWant.label} Costs`,
        explanation: `A modest monthly budget for ${secondWant.label.toLowerCase()} can help you stay on track while still leaving room for the things you enjoy.`,
        impact: `${formatCurrency(reduction, currency)}/month (estimated)`,
        priority: 'Medium',
      })
    }
  }

  const emergencyTarget = summary.needsTotal * 3
  if (plan.currentSavings < emergencyTarget && emergencyTarget > 0) {
    suggestions.push({
      title: 'Build Your Emergency Fund',
      explanation: `Aim to set aside at least 3 months of essential expenses (around ${formatCurrency(emergencyTarget, currency)}) before prioritizing other goals heavily.`,
      impact: 'Improves financial resilience',
      priority: 'Medium',
    })
  }

  suggestions.push({
    title: 'Automate Your Savings',
    explanation: 'Schedule an automatic transfer to a separate savings account right after payday, so saving happens before spending has a chance to catch up.',
    impact: summary.suggestedSavings > 0 ? `${formatCurrency(summary.suggestedSavings, currency)}/month (estimated)` : 'Builds a consistent habit',
    priority: 'Low',
  })

  return suggestions.slice(0, 5)
}

export interface MonthlySummary {
  headline: string
  biggestCategory: string
  savingsProgress: string
  positive: string
  improve: string
  nextFocus: string
}

export function generateMonthlySummary(plan: FinancialPlanInput): MonthlySummary {
  const summary = computeBudgetSummary(plan)
  const allCategories = [...summary.needsBreakdown, ...summary.wantsBreakdown].sort((a, b) => b.amount - a.amount)
  const biggest = allCategories[0]

  const headline = summary.isOverspending
    ? 'Your spending currently exceeds your income, so this month needs some attention.'
    : summary.savingsRate >= 0.2
      ? 'Your finances look healthy overall, with a solid savings buffer each month.'
      : 'Your finances are stable this month, with some room to grow your savings rate.'

  return {
    headline,
    biggestCategory: biggest
      ? `${biggest.label} is your largest expense category at ${formatCurrency(biggest.amount, plan.currency)}/month.`
      : 'No single category dominates your spending this month.',
    savingsProgress: `You've saved ${formatCurrency(plan.currentSavings, plan.currency)} toward your ${formatCurrency(plan.targetAmount, plan.currency)} goal — about ${summary.goalProgressPct}% of the way there.`,
    positive: summary.isOverspending
      ? "You're actively tracking your finances, which is the first step toward turning things around."
      : "You're living within your means this month, which is a strong foundation to build on.",
    improve:
      summary.wantsTotal > summary.needsTotal * 0.5
        ? 'Discretionary spending is relatively high compared to essentials — small trims here can add up quickly.'
        : 'Consider automating transfers to savings so progress continues without manual effort.',
    nextFocus:
      summary.monthsToGoal != null
        ? `Stay consistent with your current plan and you could reach your goal in about ${monthsBetween(summary.monthsToGoal)}.`
        : 'Set aside a regular monthly savings amount to start tracking progress toward your goal.',
  }
}

const CHAT_FALLBACK =
  "That's a great question to explore. As a general principle, tracking your top spending categories and automating a fixed monthly transfer to savings tends to compound into real progress over time. Try rephrasing with a specific number or category for a more tailored estimate."

export function generateChatResponse(question: string, plan: FinancialPlanInput): string {
  const summary = computeBudgetSummary(plan)
  const q = question.toLowerCase()
  const { currency } = plan

  if (q.includes('afford')) {
    return summary.isOverspending
      ? `Based on your numbers, your monthly expenses (${formatCurrency(summary.totalExpenses, currency)}) exceed your income (${formatCurrency(summary.totalIncome, currency)}) by ${formatCurrency(Math.abs(summary.availableBalance), currency)}. It may be worth reviewing discretionary categories first. This is an estimate, not financial advice.`
      : `Your current expenses (${formatCurrency(summary.totalExpenses, currency)}) fit within your income (${formatCurrency(summary.totalIncome, currency)}), leaving about ${formatCurrency(summary.availableBalance, currency)} available each month. This is an estimate, not a guarantee.`
  }

  if (q.includes('how long') || q.includes('reach') || q.includes('goal')) {
    return summary.monthsToGoal != null
      ? `At an estimated savings rate of ${formatCurrency(summary.suggestedSavings, currency)}/month, you could reach your "${plan.financialGoal}" goal in roughly ${monthsBetween(summary.monthsToGoal)}. This assumes consistent saving and is only an estimate.`
      : `Once there's a positive monthly savings amount, I can estimate how long it would take to reach your "${plan.financialGoal}" goal.`
  }

  if (q.includes('too much') || q.includes('where am i') || q.includes('overspending')) {
    const top = [...summary.needsBreakdown, ...summary.wantsBreakdown].sort((a, b) => b.amount - a.amount)[0]
    return top
      ? `${top.label} is currently your biggest expense at ${formatCurrency(top.amount, currency)}/month, out of a total income of ${formatCurrency(summary.totalIncome, currency)}. Setting a monthly cap there is usually the fastest place to find extra room. This is an estimate based on your inputs.`
      : "I don't see a standout overspending category based on your current inputs."
  }

  const amountMatch = q.match(/(\d[\d,]*)/)
  if (q.includes('save') && amountMatch) {
    const extra = Number(amountMatch[1].replace(/,/g, ''))
    if (extra > 0) {
      const newSavings = summary.suggestedSavings + extra
      const remaining = Math.max(plan.targetAmount - plan.currentSavings, 0)
      const newMonths = newSavings > 0 ? Math.ceil(remaining / newSavings) : null
      return `Saving an extra ${formatCurrency(extra, currency)}/month would bring your total estimated monthly savings to about ${formatCurrency(newSavings, currency)}${newMonths != null ? `, reaching your goal in roughly ${monthsBetween(newMonths)}` : ''}. Try the What-If Simulator on the Savings tab for a full breakdown. This is an estimate, not a guarantee.`
    }
  }

  return CHAT_FALLBACK
}
