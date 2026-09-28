import { Info } from 'lucide-react'

export function Disclaimer({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-800 ${className}`}
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0" />
      <p>
        FinWise AI provides estimates and educational financial insights. It does not provide professional
        financial, investment, tax, or legal advice, and its recommendations do not guarantee financial outcomes.
      </p>
    </div>
  )
}
