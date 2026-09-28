import type { FinancialPlanInput } from './types'

export const DEMO_PLAN: FinancialPlanInput = {
  currency: 'INR',
  monthlyIncome: 50000,
  otherIncome: 5000,
  expenses: {
    housing: 15000,
    food: 7000,
    transportation: 4000,
    utilities: 3000,
    entertainment: 3000,
    shopping: 4000,
    education: 0,
    healthcare: 2000,
    other: 2000,
    custom: [],
  },
  financialGoal: 'Emergency fund',
  targetAmount: 150000,
  targetDate: '2027-03-31',
  currentSavings: 40000,
  riskPreference: 'balanced',
  notes: '',
}
