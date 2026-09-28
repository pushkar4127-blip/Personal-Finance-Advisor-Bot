import { createFileRoute, useNavigate, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Wallet, PieChart, PiggyBank, TrendingUp, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react'
import { useFinancialPlan } from '@/context/financial-plan-context'
import { DEMO_PLAN } from '@/lib/demoData'
import { Disclaimer } from '@/components/Disclaimer'
import { LoadingOverlay } from '@/components/LoadingOverlay'

export const Route = createFileRoute('/')({
  component: Landing,
})

const FEATURES = [
  {
    icon: PieChart,
    title: 'AI Budget Planning',
    description: 'Get a clear needs, wants, and savings breakdown tailored to your income and expenses.',
  },
  {
    icon: PiggyBank,
    title: 'Smart Saving Suggestions',
    description: 'Receive prioritized, realistic ways to free up cash every month — with estimated impact.',
  },
  {
    icon: TrendingUp,
    title: 'Monthly Financial Insights',
    description: 'Understand where you stand, what to watch, and what to focus on next month.',
  },
]

const STEPS = [
  { title: 'Share your numbers', description: 'Income, expenses, and a financial goal — takes about two minutes.' },
  { title: 'Get your AI plan', description: 'FinWise AI builds a personalized budget, savings plan, and summary.' },
  { title: 'Track and adjust', description: 'Explore what-if scenarios and ask follow-up questions anytime.' },
]

function Landing() {
  const { setPlan } = useFinancialPlan()
  const navigate = useNavigate()
  const [isLoadingDemo, setIsLoadingDemo] = useState(false)

  function handleTryDemo() {
    setIsLoadingDemo(true)
    setTimeout(() => {
      setPlan(DEMO_PLAN)
      navigate({ to: '/dashboard' })
    }, 700)
  }

  return (
    <div className="min-h-screen bg-white">
      {isLoadingDemo && <LoadingOverlay message="Loading your demo financial plan..." />}
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
              <Wallet className="h-4.5 w-4.5" />
            </span>
            <span className="text-base font-semibold tracking-tight text-gray-900">
              FinWise <span className="text-indigo-600">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="hidden text-sm font-medium text-gray-600 hover:text-gray-900 sm:block">
              Dashboard
            </Link>
            <Link
              to="/plan/new"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pt-24 lg:px-8">
        <div className="mx-auto mb-6 flex w-fit items-center gap-1.5 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
          <Sparkles className="h-3.5 w-3.5" />
          Powered by AI financial analysis
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Your AI-Powered <span className="text-indigo-600">Personal Finance</span> Advisor
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-500">
          Understand your spending, build a smarter budget, and reach your financial goals.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/plan/new"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 sm:w-auto"
          >
            Create My Financial Plan
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={handleTryDemo}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:bg-gray-50 sm:w-auto"
          >
            <Sparkles className="h-4 w-4 text-indigo-600" />
            Try Demo
          </button>
        </div>
        <p className="mt-4 text-xs text-gray-400">No sign-up required. Your data stays on this device.</p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <feature.icon className="h-5.5 w-5.5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">How it works</h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {STEPS.map((step, index) => (
              <div key={step.title} className="text-center sm:text-left">
                <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white sm:mx-0">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ShieldCheck className="h-4 w-4 text-indigo-600" />
            Educational tool for personal planning purposes.
          </div>
        </div>
        <Disclaimer className="mt-6" />
      </footer>
    </div>
  )
}
