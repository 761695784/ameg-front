'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CataloguePagination({
  currentPage,
  lastPage,
}: {
  currentPage: number
  lastPage: number
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  if (lastPage <= 1) return null

  function goTo(page: number) {
    const params = new URLSearchParams(searchParams.toString())
    if (page <= 1) params.delete('page')
    else params.set('page', String(page))
    router.push(`${pathname}?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const pages = Array.from({ length: lastPage }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === lastPage || Math.abs(p - currentPage) <= 1,
  )

  return (
    <nav className="mt-10 flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        type="button"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Page précédente"
        className="flex size-9 items-center justify-center rounded-lg border border-border text-navy transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pages.map((page, i) => {
        const prev = pages[i - 1]
        const gap = prev && page - prev > 1
        return (
          <span key={page} className="flex items-center gap-1.5">
            {gap && <span className="px-1 text-muted-foreground">…</span>}
            <button
              type="button"
              onClick={() => goTo(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              className={cn(
                'flex size-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors',
                page === currentPage
                  ? 'border-navy bg-navy text-white'
                  : 'border-border text-navy hover:bg-muted',
              )}
            >
              {page}
            </button>
          </span>
        )
      })}

      <button
        type="button"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage >= lastPage}
        aria-label="Page suivante"
        className="flex size-9 items-center justify-center rounded-lg border border-border text-navy transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}
