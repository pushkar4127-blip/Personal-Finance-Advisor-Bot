import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AppShell } from '@/components/layout/AppShell'
import { EmptyPlanState } from '@/components/dashboard/EmptyPlanState'
import { useFinancialPlan } from '@/context/financial-plan-context'
import '@/lib/chartSetup'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  const { plan, ready } = useFinancialPlan()

  return (
    <AppShell>
      {!ready ? (
        <div className="flex h-64 items-center justify-center text-sm text-gray-400">Loading your plan…</div>
      ) : !plan ? (
        <EmptyPlanState />
      ) : (
        <Outlet />
      )}
    </AppShell>
  )
}
