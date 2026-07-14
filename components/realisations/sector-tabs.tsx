'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { SECTORS } from '@/lib/site'
import { cn } from '@/lib/utils'

export function SectorTabs() {
  const router = useRouter()
  const params = useSearchParams()
  const active = params.get('sector') ?? 'all'

  function select(value: string) {
    const search = new URLSearchParams()
    if (value !== 'all') search.set('sector', value)
    const qs = search.toString()
    router.push(qs ? `/realisations?${qs}` : '/realisations')
  }

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {SECTORS.map((sector) => (
        <button
          key={sector.value}
          type="button"
          onClick={() => select(sector.value)}
          className={cn(
            'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
            active === sector.value
              ? 'border-navy bg-navy text-white'
              : 'border-border bg-card text-muted-foreground hover:border-navy/40 hover:text-navy',
          )}
        >
          {sector.label}
        </button>
      ))}
    </div>
  )
}
