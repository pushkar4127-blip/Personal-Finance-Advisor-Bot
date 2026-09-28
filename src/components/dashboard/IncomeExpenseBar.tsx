import { Bar } from 'react-chartjs-2'
import { formatCurrency } from '@/lib/currency'
import type { Currency } from '@/lib/types'

const SERIES_BLUE = '#2a78d6'
const SERIES_ORANGE = '#eb6834'

export function IncomeExpenseBar({
  income,
  expenses,
  currency,
}: {
  income: number
  expenses: number
  currency: Currency
}) {
  const data = {
    labels: ['This month'],
    datasets: [
      { label: 'Income', data: [income], backgroundColor: SERIES_BLUE, borderRadius: 6, maxBarThickness: 64 },
      { label: 'Expenses', data: [expenses], backgroundColor: SERIES_ORANGE, borderRadius: 6, maxBarThickness: 64 },
    ],
  }

  return (
    <Bar
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: { position: 'bottom', labels: { color: '#52514e', usePointStyle: true, pointStyle: 'circle' } },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.dataset.label}: ${formatCurrency(Number(ctx.raw), currency)}`,
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#e1e0d9' },
            ticks: { color: '#898781', callback: (value) => formatCurrency(Number(value), currency) },
          },
          x: { grid: { display: false }, ticks: { color: '#898781' } },
        },
      }}
    />
  )
}
