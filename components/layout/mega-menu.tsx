'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { useRef, useState } from 'react'
import type { Category } from '@/lib/types'
import { cn } from '@/lib/utils'

export function MegaMenu({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useState(false)
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  function openMenu() {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current)
      closeTimeout.current = null
    }
    setOpen(true)
  }

  // Léger délai avant de fermer : laisse le temps à la souris de traverser
  // l'espace entre le lien "Catalogue" et le panneau (qui est en `fixed`,
  // donc géométriquement séparé du lien) sans déclencher une fermeture prématurée.
  function scheduleClose() {
    closeTimeout.current = setTimeout(() => setOpen(false), 200)
  }

  return (
    <div className="relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
      <Link
        href="/catalogue"
        className={cn(
          'inline-flex items-center gap-1 py-2 text-sm font-medium text-navy transition-colors hover:text-turquoise',
          open && 'text-turquoise',
        )}
        aria-expanded={open}
      >
        Catalogue
        <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} />
      </Link>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed inset-x-0 top-[6.75rem] z-50 flex justify-center px-4"
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
        >
          <div className="flex max-h-[calc(100vh-9rem)] w-[min(60rem,90vw)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl">
            <div className="grid grid-cols-2 gap-x-6 gap-y-5 overflow-y-auto p-6 md:grid-cols-4">
              {categories.map((category) => (
                <div key={category.id} className="min-w-0">
                  <Link
                    href={`/catalogue?category_id=${category.id}`}
                    className="group flex items-center gap-1 text-sm font-semibold text-navy hover:text-turquoise"
                  >
                    <span className="truncate">{category.name}</span>
                  </Link>
                  <ul className="mt-2 flex flex-col gap-1.5">
                    {category.subcategories?.slice(0, 4).map((sub) => (
                      <li key={sub.id}>
                        <Link
                          href={`/catalogue?category_id=${category.id}&subcategory_id=${sub.id}`}
                          className="text-[0.8rem] text-muted-foreground transition-colors hover:text-turquoise"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="flex shrink-0 items-center justify-between border-t bg-secondary/60 px-6 py-3">
              <p className="text-sm text-muted-foreground">
                Plus de 500 références disponibles pour votre établissement.
              </p>
              <Link
                href="/catalogue"
                className="inline-flex items-center gap-1 text-sm font-semibold text-orange hover:gap-2 transition-all"
              >
                Voir tout le catalogue <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
