'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'
import { Menu, MessageCircle, Search, ShoppingCart, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { MegaMenu } from './mega-menu'
import { useQuoteCart } from '@/components/quote/quote-cart-provider'
import { QuoteCartDrawer } from '@/components/quote/quote-cart-drawer'
import { NAV_LINKS } from '@/lib/site'
import type { Category } from '@/lib/types'
import { cn } from '@/lib/utils'

const SECONDARY_LINKS = NAV_LINKS.filter((l) => l.href !== '/catalogue')

export function HeaderClient({
  categories,
  whatsappUrl,
  logo,
}: {
  categories: Category[]
  whatsappUrl: string
  logo: ReactNode
}) {
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { count, setOpen } = useQuoteCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function submitSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/catalogue?q=${encodeURIComponent(query.trim())}`)
    setSearchOpen(false)
    setMobileOpen(false)
  }

  return (
    <div
      className={cn(
        'border-b bg-card/95 backdrop-blur transition-shadow',
        scrolled ? 'shadow-sm' : 'shadow-none',
      )}
    >
      <div className="container-ameg flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link href="/" aria-label="Accueil AMEG International" className="shrink-0">
          {logo}
        </Link>

      <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
        <Link
          href="/"
          className={cn(
            'py-2 text-sm font-medium transition-colors hover:text-turquoise',
            pathname === '/' ? 'text-turquoise' : 'text-navy',
          )}
        >
          Accueil
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
          <MegaMenu categories={categories} />
          {SECONDARY_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'py-2 text-sm font-medium transition-colors hover:text-turquoise',
                pathname.startsWith(link.href) ? 'text-turquoise' : 'text-navy',
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            aria-label="Rechercher"
            onClick={() => setSearchOpen((v) => !v)}
            className="flex size-9 items-center justify-center rounded-lg text-navy transition-colors hover:bg-muted"
          >
            <Search className="size-5" />
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contacter sur WhatsApp"
            className="hidden size-9 items-center justify-center rounded-lg text-turquoise transition-colors hover:bg-accent sm:flex"
          >
            <MessageCircle className="size-5" />
          </a>

          <button
            type="button"
            aria-label={`Panier de devis, ${count} article${count > 1 ? 's' : ''}`}
            onClick={() => setOpen(true)}
            className="relative flex size-9 items-center justify-center rounded-lg text-navy transition-colors hover:bg-muted"
          >
            <ShoppingCart className="size-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex min-w-4.5 items-center justify-center rounded-full bg-orange px-1 text-[0.65rem] font-bold text-orange-foreground">
                {count}
              </span>
            )}
          </button>

          <Button variant="cta" size="lg2" className="ml-1 hidden md:inline-flex" render={<Link href="/devis" />}>
            Demander un devis
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <button
                  type="button"
                  aria-label="Ouvrir le menu"
                  className="flex size-9 items-center justify-center rounded-lg text-navy hover:bg-muted lg:hidden"
                />
              }
            >
              <Menu className="size-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm overflow-y-auto p-0">
              <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
              <div className="flex flex-col p-6">
                <form onSubmit={submitSearch} className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher un équipement..."
                    className="h-11 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm outline-none focus:border-turquoise"
                  />
                </form>

                <Accordion>
                  <AccordionItem value="catalogue">
                    <AccordionTrigger className="text-base font-semibold text-navy">
                      Catalogue
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="flex flex-col gap-2 pb-2">
                        {categories.map((cat) => (
                          <li key={cat.id}>
                            <Link
                              href={`/catalogue?category_id=${cat.id}`}
                              onClick={() => setMobileOpen(false)}
                              className="text-sm text-muted-foreground hover:text-turquoise"
                            >
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <nav className="mt-2 flex flex-col divide-y" aria-label="Navigation mobile">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'py-3 text-base font-medium transition-colors hover:text-turquoise',
                    pathname === '/' ? 'text-turquoise font-semibold' : 'text-navy',
                  )}
                >
                  Accueil
                </Link>
                <nav className="mt-2 flex flex-col divide-y" aria-label="Navigation mobile">
                  {SECONDARY_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="py-3 text-base font-medium text-navy hover:text-turquoise"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                </nav>

                <Button variant="cta" size="xl" className="mt-6" render={<Link href="/devis" />} onClick={() => setMobileOpen(false)}>
                  Demander un devis
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t bg-card">
          <form onSubmit={submitSearch} className="container-ameg flex items-center gap-2 py-3">
            <Search className="size-5 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un produit, une référence, une marque..."
              className="h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="button" aria-label="Fermer la recherche" onClick={() => setSearchOpen(false)}>
              <X className="size-5 text-muted-foreground hover:text-navy" />
            </button>
          </form>
        </div>
      )}

      <QuoteCartDrawer />
    </div>
  )
}
