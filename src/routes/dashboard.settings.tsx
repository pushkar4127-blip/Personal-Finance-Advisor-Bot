import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Pencil, Trash2, ShieldCheck } from 'lucide-react'
import { useFinancialPlan } from '@/context/financial-plan-context'
import { CURRENCIES } from '@/lib/currency'
import { Disclaimer } from '@/components/Disclaimer'
import type { RiskPreference } from '@/lib/types'

export const Route = createFileRoute('/dashboard/settings')({
  component: SettingsPage,
})

const RISK_LABELS: Record<RiskPreference, string> = {
  conservative: 'Conservative',
  balanced: 'Balanced',
  aggressive: 'Aggressive',
}

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-sm outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'

function SettingsPage() {
  const { plan, setPlan, clearPlan } = useFinancialPlan()
  const navigate = useNavigate()
  const [confirmingClear, setConfirmingClear] = useState(false)

  if (!plan) return null

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your currency, risk preference, and stored plan data.</p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-900">Preferences</h2>
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">Currency</span>
            <select
              className={inputClass}
              value={plan.currency}
              onChange={(e) => setPlan({ ...plan, currency: e.target.value as typeof plan.currency })}
            >
              {CURRENCIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-gray-700">Risk preference</span>
            <select
              className={inputClass}
              value={plan.riskPreference}
              onChange={(e) => setPlan({ ...plan, riskPreference: e.target.value as RiskPreference })}
            >
              {Object.entries(RISK_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-900">Your Plan</h2>
        <p className="mt-1 text-sm text-gray-500">Edit your full income, expenses, and goal details.</p>
        <Link
          to="/plan/new"
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          <Pencil className="h-4 w-4" />
          Edit Financial Plan
        </Link>
      </div>

      <div className="rounded-2xl border border-red-100 bg-white p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-900">Clear Data</h2>
        <p className="mt-1 text-sm text-gray-500">
          Your financial plan is stored only on this device and never sent anywhere. You can remove it at any time.
        </p>
        {!confirmingClear ? (
          <button
            type="button"
            onClick={() => setConfirmingClear(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Clear My Data
          </button>
        ) : (
          <div className="mt-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                clearPlan()
                navigate({ to: '/' })
              }}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Confirm — delete plan
            </button>
            <button
              type="button"
              onClick={() => setConfirmingClear(false)}
              className="rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-400">
        <ShieldCheck className="h-4 w-4" />
        No sensitive financial data is stored on any server.
      </div>
      <Disclaimer />
    </div>
  )
}
