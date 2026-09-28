import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { FinancialPlanProvider } from '@/context/financial-plan-context'

import '../styles.css'

const siteName = 'FinWise AI — Personal Finance Advisor'
const siteDescription = 'Understand your spending, build a smarter budget, and reach your financial goals with an AI-powered personal finance advisor.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteName,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      {
        property: 'og:title',
        content: siteName,
      },
      {
        property: 'og:description',
        content: siteDescription,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <FinancialPlanProvider>{children}</FinancialPlanProvider>
        <Scripts />
      </body>
    </html>
  )
}
