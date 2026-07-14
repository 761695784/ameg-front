'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

/**
 * Renders the public site chrome (header/footer/floating CTA) for all routes
 * except the admin area, which uses its own minimal layout.
 */
export function SiteChrome({
  header,
  footer,
  floating,
  children,
}: {
  header: ReactNode
  footer: ReactNode
  floating: ReactNode
  children: ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')

  if (isAdmin) {
    return <>{children}</>
  }

  return (
    <>
      {header}
      <main className="min-h-screen">{children}</main>
      {footer}
      {floating}
    </>
  )
}
