import { Line } from 'react-chartjs-2'
import { formatCurrency } from '@/lib/currency'
import type { Currency } from '@/lib/types'

const SERIES_BLUE = '#2a78d6'

export function CashFlowChart({
  currentSavings,
  monthlySavings,
  currency,
}: {
  currentSavings: number
  monthlySavings: number
  currency: Currency
}) {
  const months = Array.from({ length: 12 }, (_, i) => `M${i + 1}`)
  const projection = months.map((_, i) => currentSavings + monthlySavings * (i + 1))

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Projected savings balance',
        data: projection,
        borderColor: SERIES_BLUE,
        backgroundColor: 'rgba(42, 120, 214, 0.12)',
        fill: true,
        tension: 0.35,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  }

  return (
    <Line
      data={data}
      options={{
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${formatCurrency(Number(ctx.raw), currency)} projected balance`,
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
