import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState, type FormEvent, type ReactNode } from 'react'
import {
  Wallet,
  Home,
  Utensils,
  Car,
  Zap,
  Film,
  ShoppingBag,
  GraduationCap,
  HeartPulse,
  MoreHorizontal,
  Plus,
  Trash2,
  Target,
  Sparkles,
  ArrowLeft,
} from 'lucide-react'
import { useFinancialPlan } from '@/context/financial-plan-context'
import { DEMO_PLAN } from '@/lib/demoData'
import { CURRENCIES } from '@/lib/currency'
import { GOAL_OPTIONS, EMPTY_PLAN, type CustomExpense, type FinancialPlanInput, type RiskPreference } from '@/lib/types'
import { LoadingOverlay } from '@/components/LoadingOverlay'

export const Route = createFileRoute('/plan/new')({
  component: PlanForm,
})

type ExpenseFieldKey =
  | 'housing'
  | 'food'
  | 'transportation'
  | 'utilities'
  | 'entertainment'
  | 'shopping'
  | 'education'
  | 'healthcare'
  | 'other'

const EXPENSE_FIELDS: { key: ExpenseFieldKey; label: string; icon: typeof Home }[] = [
  { key: 'housing', label: 'Rent / Housing', icon: Home },
  { key: 'food', label: 'Food', icon: Utensils },
  { key: 'transportation', label: 'Transportation', icon: Car },
  { key: 'utilities', label: 'Utilities', icon: Zap },
  { key: 'entertainment', label: 'Entertainment', icon: Film },
  { key: 'shopping', label: 'Shopping', icon: ShoppingBag },
  { key: 'education', label: 'Education', icon: GraduationCap },
  { key: 'healthcare', label: 'Healthcare', icon: HeartPulse },
  { key: 'other', label: 'Other expenses', icon: MoreHorizontal },
]

const RISK_OPTIONS: { value: RiskPreference; label: string; description: string }[] = [
  { value: 'conservative', label: 'Conservative', description: 'Prioritize safety and a larger savings buffer.' },
  { value: 'balanced', label: 'Balanced', description: 'A steady mix of saving and flexibility.' },
  { value: 'aggressive', label: 'Aggressive', description: 'Save efficiently while keeping more for goals now.' },
]

function emptyPlan(): FinancialPlanInput {
  return EMPTY_PLAN
}

function Section({ step, title, description, children }: { step: number; title: string; description: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex items-start gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700">
          {step}
        </span>
        <div>
          <h2 className="text-base font-semibold text-gray-900">{title}</h2>
          <p className="mt-0.5 text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-gray-700">{label}</span>
      {children}
    </label>
  )
}

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'

function PlanForm() {
  const { plan: existingPlan, setPlan } = useFinancialPlan()
  const navigate = useNavigate()
  const [form, setForm] = useState<FinancialPlanInput>(existingPlan ?? emptyPlan())
  const [error, setError] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  function updateExpense(key: ExpenseFieldKey, value: number) {
    setForm((prev) => ({ ...prev, expenses: { ...prev.expenses, [key]: value } }))
  }

  function addCustomExpense() {
    const item: CustomExpense = { id: crypto.randomUUID(), label: '', amount: 0 }
    setForm((prev) => ({ ...prev, expenses: { ...prev.expenses, custom: [...prev.expenses.custom, item] } }))
  }

  function updateCustomExpense(id: string, patch: Partial<CustomExpense>) {
    setForm((prev) => ({
      ...prev,
      expenses: {
        ...prev.expenses,
        custom: prev.expenses.custom.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      },
    }))
  }

  function removeCustomExpense(id: string) {
    setForm((prev) => ({
      ...prev,
      expenses: { ...prev.expenses, custom: prev.expenses.custom.filter((item) => item.id !== id) },
    }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (form.monthlyIncome <= 0) {
      setError('Please enter a monthly income greater than zero.')
      return
    }
    if (form.targetAmount < 0 || form.currentSavings < 0) {
      setError('Savings and target amounts cannot be negative.')
      return
    }
    setError(null)
    setIsGenerating(true)
    setTimeout(() => {
      setPlan(form)
      navigate({ to: '/dashboard' })
    }, 900)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {isGenerating && <LoadingOverlay />}
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <button
            type="button"
            onClick={() => setForm(DEMO_PLAN)}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-600" />
            Fill with demo data
          </button>
        </div>

        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
            <Wallet className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{existingPlan ? 'Update Your Financial Plan' : 'Build Your Financial Plan'}</h1>
            <p className="text-sm text-gray-500">A few details help FinWise AI personalize your budget and goals.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Section step={1} title="Income" description="Your regular monthly income sources.">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Monthly income">
                <input
                  type="number"
                  min={0}
                  required
                  className={inputClass}
                  value={form.monthlyIncome || ''}
                  onChange={(e) => setForm((prev) => ({ ...prev, monthlyIncome: Number(e.target.value) }))}
                  placeholder="50000"
                />
              </Field>
              <Field label="Other monthly income">
                <input
                  type="number"
                  min={0}
                  className={inputClass}
                  value={form.otherIncome || ''}
                  onChange={(e) => setForm((prev) => ({ ...prev, otherIncome: Number(e.target.value) }))}
                  placeholder="5000"
                />
              </Field>
            </div>
            <Field label="Currency">
              <select
                className={inputClass}
                value={form.currency}
                onChange={(e) => setForm((prev) => ({ ...prev, currency: e.target.value as FinancialPlanInput['currency'] }))}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </Field>
          </Section>

          <Section step={2} title="Monthly Expenses" description="Estimate what you typically spend each month.">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {EXPENSE_FIELDS.map((field) => (
                <Field key={field.key} label={field.label}>
                  <div className="relative">
                    <field.icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      min={0}
                      className={`${inputClass} pl-9`}
                      value={form.expenses[field.key] || ''}
                      onChange={(e) => updateExpense(field.key, Number(e.target.value))}
                      placeholder="0"
                    />
                  </div>
                </Field>
              ))}
            </div>

            {form.expenses.custom.length > 0 && (
              <div className="space-y-3 border-t border-gray-100 pt-4">
                {form.expenses.custom.map((item) => (
                  <div key={item.id} className="flex items-center gap-2">
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Expense name"
                      value={item.label}
                      onChange={(e) => updateCustomExpense(item.id, { label: e.target.value })}
                    />
                    <input
                      type="number"
                      min={0}
                      className={`${inputClass} w-32`}
                      placeholder="0"
                      value={item.amount || ''}
                      onChange={(e) => updateCustomExpense(item.id, { amount: Number(e.target.value) })}
                    />
                    <button
                      type="button"
                      aria-label="Remove expense"
                      onClick={() => removeCustomExpense(item.id)}
                      className="shrink-0 rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={addCustomExpense}
              className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="h-4 w-4" />
              Add Expense
            </button>
          </Section>

          <Section step={3} title="Financial Goals" description="What are you working toward?">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Primary financial goal">
                <select
                  className={inputClass}
                  value={form.financialGoal}
                  onChange={(e) => setForm((prev) => ({ ...prev, financialGoal: e.target.value }))}
                >
                  {GOAL_OPTIONS.map((goal) => (
                    <option key={goal} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Target amount">
                <div className="relative">
                  <Target className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <input
                    type="number"
                    min={0}
                    className={`${inputClass} pl-9`}
                    value={form.targetAmount || ''}
                    onChange={(e) => setForm((prev) => ({ ...prev, targetAmount: Number(e.target.value) }))}
                    placeholder="150000"
                  />
                </div>
              </Field>
              <Field label="Target date">
                <input
                  type="date"
                  className={inputClass}
                  value={form.targetDate}
                  onChange={(e) => setForm((prev) => ({ ...prev, targetDate: e.target.value }))}
                />
              </Field>
              <Field label="Current savings">
                <input
                  type="number"
                  min={0}
                  className={inputClass}
                  value={form.currentSavings || ''}
                  onChange={(e) => setForm((prev) => ({ ...prev, currentSavings: Number(e.target.value) }))}
                  placeholder="40000"
                />
              </Field>
            </div>
          </Section>

          <Section step={4} title="Preferences" description="Helps tailor how aggressively FinWise AI recommends saving.">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {RISK_OPTIONS.map((option) => (
                <button
                  type="button"
                  key={option.value}
                  onClick={() => setForm((prev) => ({ ...prev, riskPreference: option.value }))}
                  className={`rounded-xl border p-4 text-left transition-colors ${
                    form.riskPreference === option.value
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <p className={`text-sm font-semibold ${form.riskPreference === option.value ? 'text-indigo-700' : 'text-gray-900'}`}>
                    {option.label}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">{option.description}</p>
                </button>
              ))}
            </div>
            <Field label="Optional notes">
              <textarea
                className={inputClass}
                rows={3}
                value={form.notes}
                onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Anything else FinWise AI should consider..."
              />
            </Field>
          </Section>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:opacity-60"
          >
            Generate My Financial Plan
          </button>
        </form>
      </div>
    </div>
  )
}
