'use client'

import { useCallback, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import type { Brand, Category } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const AVAILABILITY = [
  { value: 'en_stock', label: 'En stock' },
  { value: 'sur_commande', label: 'Sur commande' },
]

const SORTS = [
  { value: '', label: 'Pertinence' },
  { value: 'recent', label: 'Plus récents' },
  { value: 'price_asc', label: 'Prix croissant' },
  { value: 'price_desc', label: 'Prix décroissant' },
  { value: 'name', label: 'Nom (A-Z)' },
]

export function CatalogueFilters({
  categories,
  brands,
}: {
  categories: Category[]
  brands: Brand[]
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [search, setSearch] = useState(searchParams.get('q') ?? '')

  const current = useMemo(
    () => ({
      category_id: searchParams.get('category_id') ?? '',
      brand_id: searchParams.get('brand_id') ?? '',
      availability: searchParams.get('availability') ?? '',
      sort: searchParams.get('sort') ?? '',
    }),
    [searchParams],
  )

  const setParam = useCallback(
    (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === null || value === '' || params.get(key) === value) {
        params.delete(key)
      } else {
        params.set(key, value)
      }
      params.delete('page')
      router.push(`${pathname}?${params.toString()}`)
    },
    [pathname, router, searchParams],
  )

  const activeCount =
    (current.category_id ? 1 : 0) +
    (current.brand_id ? 1 : 0) +
    (current.availability ? 1 : 0) +
    (searchParams.get('q') ? 1 : 0)

  function submitSearch(e: React.FormEvent) {
    e.preventDefault()
    setParam('q', search.trim() || null)
    setMobileOpen(false)
  }

  function reset() {
    setSearch('')
    router.push(pathname)
    setMobileOpen(false)
  }

  const panel = (
    <div className="flex flex-col gap-7">
      <form onSubmit={submitSearch} className="relative">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher..."
          className="h-11 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-turquoise"
        />
      </form>

      <FilterGroup title="Tri">
        <div className="flex flex-col gap-1.5">
          {SORTS.map((s) => (
            <RadioRow
              key={s.value}
              label={s.label}
              checked={current.sort === s.value}
              onClick={() => setParam('sort', s.value || null)}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Catégories">
        <div className="flex max-h-64 flex-col gap-1.5 overflow-y-auto pr-1">
          {categories.map((cat) => (
            <RadioRow
              key={cat.id}
              label={cat.name}
              count={cat.products_count}
              checked={current.category_id === String(cat.id)}
              onClick={() => setParam('category_id', String(cat.id))}
            />
          ))}
        </div>
      </FilterGroup>

      {brands.length > 0 && (
        <FilterGroup title="Marques">
          <div className="flex max-h-56 flex-col gap-1.5 overflow-y-auto pr-1">
            {brands.map((brand) => (
              <RadioRow
                key={brand.id}
                label={brand.name}
                count={brand.products_count}
                checked={current.brand_id === String(brand.id)}
                onClick={() => setParam('brand_id', String(brand.id))}
              />
            ))}
          </div>
        </FilterGroup>
      )}

      <FilterGroup title="Disponibilité">
        <div className="flex flex-col gap-1.5">
          {AVAILABILITY.map((a) => (
            <RadioRow
              key={a.value}
              label={a.label}
              checked={current.availability === a.value}
              onClick={() => setParam('availability', a.value)}
            />
          ))}
        </div>
      </FilterGroup>

      {activeCount > 0 && (
        <Button variant="outline" size="lg2" onClick={reset} className="w-full">
          <X className="size-4" /> Réinitialiser les filtres
        </Button>
      )}
    </div>
  )

  return (
    <>
      <div className="mb-4 lg:hidden">
        <Button variant="outline" size="lg2" onClick={() => setMobileOpen((v) => !v)} className="w-full">
          <SlidersHorizontal className="size-4" />
          Filtres{activeCount > 0 ? ` (${activeCount})` : ''}
        </Button>
      </div>

      <aside
        className={cn(
          'lg:sticky lg:top-24 lg:block lg:h-fit',
          mobileOpen ? 'block' : 'hidden',
        )}
      >
        <div className="rounded-2xl border border-border bg-card p-5">{panel}</div>
      </aside>
    </>
  )
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-navy">{title}</h3>
      {children}
    </div>
  )
}

function RadioRow({
  label,
  count,
  checked,
  onClick,
}: {
  label: string
  count?: number
  checked: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center justify-between rounded-lg px-2.5 py-1.5 text-left text-sm transition-colors',
        checked ? 'bg-accent font-medium text-navy' : 'text-muted-foreground hover:bg-muted hover:text-navy',
      )}
    >
      <span className="flex items-center gap-2">
        <span
          className={cn(
            'flex size-4 shrink-0 items-center justify-center rounded-full border',
            checked ? 'border-turquoise' : 'border-input',
          )}
        >
          {checked && <span className="size-2 rounded-full bg-turquoise" />}
        </span>
        {label}
      </span>
      {typeof count === 'number' && <span className="text-xs text-muted-foreground">{count}</span>}
    </button>
  )
}
