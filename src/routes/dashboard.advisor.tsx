import { createFileRoute } from '@tanstack/react-router'
import { useFinancialPlan } from '@/context/financial-plan-context'
import { AdvisorChat } from '@/components/dashboard/AdvisorChat'
import { Disclaimer } from '@/components/Disclaimer'

export const Route = createFileRoute('/dashboard/advisor')({
  component: AdvisorPage,
})

function AdvisorPage() {
  const { plan } = useFinancialPlan()
  if (!plan) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">AI Advisor</h1>
        <p className="mt-1 text-sm text-gray-500">Ask questions about your budget, spending, or savings goal.</p>
      </div>

      <AdvisorChat plan={plan} />
      <Disclaimer />
    </div>
  )
}
