import { useState, type FormEvent } from 'react'
import { Send, Sparkles, User } from 'lucide-react'
import { generateChatResponse } from '@/lib/aiFixtures'
import type { FinancialPlanInput } from '@/lib/types'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
}

const SUGGESTED_QUESTIONS = [
  'How can I save ₹5,000 more every month?',
  'Where am I spending too much?',
  'Can I afford my current expenses?',
  'How long will it take me to reach my savings goal?',
]

export function AdvisorChat({ plan }: { plan: FinancialPlanInput }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: `Hi! I'm FinWise AI. Ask me anything about your budget, spending, or your "${plan.financialGoal}" goal.`,
    },
  ])
  const [input, setInput] = useState('')

  function ask(question: string) {
    const trimmed = question.trim()
    if (!trimmed) return
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', text: trimmed }
    const reply: ChatMessage = { id: crypto.randomUUID(), role: 'assistant', text: generateChatResponse(trimmed, plan) }
    setMessages((prev) => [...prev, userMessage, reply])
    setInput('')
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    ask(input)
  }

  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-gray-100 px-6 py-4">
        <Sparkles className="h-4.5 w-4.5 text-indigo-600" />
        <h3 className="text-base font-semibold text-gray-900">Ask FinWise AI</h3>
      </div>

      <div className="flex flex-col gap-4 px-6 py-5" style={{ minHeight: '18rem' }}>
        {messages.map((message) => (
          <div key={message.id} className={`flex items-start gap-2.5 ${message.role === 'user' ? 'justify-end' : ''}`}>
            {message.role === 'assistant' && (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                <Sparkles className="h-4 w-4" />
              </span>
            )}
            <p
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                message.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-700'
              }`}
            >
              {message.text}
            </p>
            {message.role === 'user' && (
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                <User className="h-4 w-4" />
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 border-t border-gray-100 px-6 py-3">
        {SUGGESTED_QUESTIONS.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => ask(question)}
            className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
          >
            {question}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-gray-100 px-6 py-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your budget, spending, or goals..."
          className="flex-1 rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
        <button
          type="submit"
          aria-label="Send"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white transition-colors hover:bg-indigo-700"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  )
}
