import type { Currency } from './types'

const LOCALE_BY_CURRENCY: Record<Currency, string> = {
  INR: 'en-IN',
  USD: 'en-US',
  EUR: 'de-DE',
  GBP: 'en-GB',
}

export const CURRENCIES: { value: Currency; label: string }[] = [
  { value: 'INR', label: 'INR — Indian Rupee (₹)' },
  { value: 'USD', label: 'USD — US Dollar ($)' },
  { value: 'EUR', label: 'EUR — Euro (€)' },
  { value: 'GBP', label: 'GBP — British Pound (£)' },
]

export function formatCurrency(amount: number, currency: Currency = 'INR') {
  const value = Number.isFinite(amount) ? amount : 0
  return new Intl.NumberFormat(LOCALE_BY_CURRENCY[currency], {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}
