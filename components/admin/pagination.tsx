'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

export function AdminPagination({
  page,
  lastPage,
  onChange,
}: {
  page: number
  lastPage: number
  onChange: (page: number) => void
}) {
  if (lastPage <= 1) return null

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className="flex size-9 items-center justify-center rounded-lg border border-border text-navy disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
      </button>
      <span className="text-sm text-muted-foreground">Page {page} / {lastPage}</span>
      <button
        type="button"
        disabled={page >= lastPage}
        onClick={() => onChange(page + 1)}
        className="flex size-9 items-center justify-center rounded-lg border border-border text-navy disabled:opacity-40"
      >
        <ChevronRight className="size-4" />
      </button>
    </div>
  )
}