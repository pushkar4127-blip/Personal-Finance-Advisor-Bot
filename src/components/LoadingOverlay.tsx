import { Sparkles } from 'lucide-react'

export function LoadingOverlay({ message = 'FinWise AI is analyzing your finances...' }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-50">
          <Sparkles className="h-6 w-6 animate-pulse text-indigo-600" />
        </span>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-600 [animation-delay:-0.3s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-600 [animation-delay:-0.15s]" />
          <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-600" />
        </div>
        <p className="text-sm font-medium text-gray-600">{message}</p>
      </div>
    </div>
  )
}
