import { Link, useNavigate } from '@tanstack/react-router'
import { Sparkles, FilePlus2 } from 'lucide-react'
import { useFinancialPlan } from '@/context/financial-plan-context'
import { DEMO_PLAN } from '@/lib/demoData'

export function EmptyPlanState() {
  const { setPlan } = useFinancialPlan()
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
        <FilePlus2 className="h-6 w-6" />
      </div>
      <h2 className="mt-4 text-lg font-semibold text-gray-900">No financial plan yet</h2>
      <p className="mt-2 max-w-sm text-sm text-gray-500">
        Create a plan with your own numbers, or load realistic sample data to explore the dashboard right away.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/plan/new"
          className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
        >
          Create My Financial Plan
        </Link>
        <button
          type="button"
          onClick={() => {
            setPlan(DEMO_PLAN)
            navigate({ to: '/dashboard' })
          }}
          className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          <Sparkles className="h-4 w-4 text-indigo-600" />
          Try Demo
        </button>
      </div>
    </div>
  )
}
