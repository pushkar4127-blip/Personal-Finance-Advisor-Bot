import { Doughnut } from 'react-chartjs-2'
import { formatCurrency } from '@/lib/currency'
import type { Currency } from '@/lib/types'

const SERIES_BLUE = '#2a78d6'
const SERIES_ORANGE = '#eb6834'
const SERIES_AQUA = '#1baf7a'

export function BudgetDonut({
  needs,
  wants,
  savings,
  currency,
}: {
  needs: number
  wants: number
  savings: number
  currency: Currency
}) {
  const data = {
    labels: ['Needs', 'Wants', 'Savings'],
    datasets: [
      {
        data: [needs, wants, Math.max(savings, 0)],
        backgroundColor: [SERIES_BLUE, SERIES_ORANGE, SERIES_AQUA],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  }

  return (
    <Doughnut
      data={data}
      options={{
        responsive: true,
        cutout: '68%',
        plugins: {
          legend: { position: 'bottom', labels: { color: '#52514e', usePointStyle: true, pointStyle: 'circle' } },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.label}: ${formatCurrency(Number(ctx.raw), currency)}`,
            },
          },
        },
      }}
    />
  )
}
