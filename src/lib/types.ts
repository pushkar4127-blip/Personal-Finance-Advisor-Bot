export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP'

export type RiskPreference = 'conservative' | 'balanced' | 'aggressive'

export interface CustomExpense {
  id: string
  label: string
  amount: number
}

export interface ExpenseBreakdown {
  housing: number
  food: number
  transportation: number
  utilities: number
  entertainment: number
  shopping: number
  education: number
  healthcare: number
  other: number
  custom: CustomExpense[]
}

export interface FinancialPlanInput {
  currency: Currency
  monthlyIncome: number
  otherIncome: number
  expenses: ExpenseBreakdown
  financialGoal: string
  targetAmount: number
  targetDate: string
  currentSavings: number
  riskPreference: RiskPreference
  notes: string
}

export const EMPTY_EXPENSES: ExpenseBreakdown = {
  housing: 0,
  food: 0,
  transportation: 0,
  utilities: 0,
  entertainment: 0,
  shopping: 0,
  education: 0,
  healthcare: 0,
  other: 0,
  custom: [],
}

export const EMPTY_PLAN: FinancialPlanInput = {
  currency: 'INR',
  monthlyIncome: 0,
  otherIncome: 0,
  expenses: EMPTY_EXPENSES,
  financialGoal: 'Emergency fund',
  targetAmount: 0,
  targetDate: '',
  currentSavings: 0,
  riskPreference: 'balanced',
  notes: '',
}

export const GOAL_OPTIONS = [
  'Emergency fund',
  'Buy a laptop',
  'Higher education',
  'Vacation',
  'Buy a vehicle',
  'House down payment',
  'General savings',
] as const
