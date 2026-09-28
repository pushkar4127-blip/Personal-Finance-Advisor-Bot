import { Link } from '@tanstack/react-router'
import { LayoutDashboard, PieChart, PiggyBank, Sparkles, Settings, Wallet, Menu, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { to: '/dashboard/budget', label: 'Budget', icon: PieChart, exact: false },
  { to: '/dashboard/savings', label: 'Savings', icon: PiggyBank, exact: false },
  { to: '/dashboard/advisor', label: 'AI Advisor', icon: Sparkles, exact: false },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings, exact: false },
] as const

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-2 px-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
        <Wallet className="h-4.5 w-4.5" />
      </span>
      <span className="text-base font-semibold tracking-tight text-gray-900">
        FinWise <span className="text-indigo-600">AI</span>
      </span>
    </Link>
  )
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-1 px-2">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          activeOptions={{ exact: item.exact }}
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
          activeProps={{ className: 'bg-indigo-50 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700' }}
        >
          <item.icon className="h-4.5 w-4.5" />
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 flex-col border-r border-gray-200 bg-white py-6 lg:flex">
          <Brand />
          <div className="mt-8 flex flex-1 flex-col">
            <NavLinks />
          </div>
          <div className="px-4 pt-4">
            <p className="text-[11px] leading-relaxed text-gray-400">Estimates only — not professional financial advice.</p>
          </div>
        </aside>

        {mobileOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-gray-900/40"
              onClick={() => setMobileOpen(false)}
            />
            <aside className="absolute inset-y-0 left-0 flex w-72 flex-col bg-white py-6 shadow-xl">
              <div className="flex items-center justify-between px-2">
                <Brand />
                <button
                  type="button"
                  aria-label="Close menu"
                  className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                  onClick={() => setMobileOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-8 flex flex-1 flex-col">
                <NavLinks onNavigate={() => setMobileOpen(false)} />
              </div>
            </aside>
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
            <button
              type="button"
              aria-label="Open menu"
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <Brand />
          </header>
          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
