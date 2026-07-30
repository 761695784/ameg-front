'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Tags,
  Upload,
  FileText,
  ClipboardList,
  Mail,
  Wrench,
  Building2,
  Settings,
  Menu,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

export const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/produits', label: 'Produits', icon: Package },
  { href: '/admin/categories', label: 'Catégories', icon: FolderTree },
  { href: '/admin/marques', label: 'Marques', icon: Tags },
  { href: '/admin/import', label: 'Import catalogue', icon: Upload },
  { href: '/admin/devis', label: 'Devis', icon: FileText },
  { href: '/admin/etudes-projet', label: 'Études de projet', icon: ClipboardList },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/realisations', label: 'Réalisations', icon: Building2 },
  // { href: '/admin/parametres', label: 'Paramètres', icon: Settings },
]

function NavList({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname()

  return (
    <ul className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onItemClick}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                active
                  ? 'bg-navy text-white'
                  : 'text-muted-foreground hover:bg-muted hover:text-navy',
              )}
            >
              <item.icon className="size-4.5 shrink-0" />
              {item.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Ferme le drawer automatiquement si l'URL change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      {/* 1. SIDEBAR DESKTOP (Fixe à gauche sur écran > lg) */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-card lg:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="font-heading text-lg font-bold text-navy">
            AMEG <span className="text-orange">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto p-3">
          <NavList />
        </nav>
      </aside>

      {/* 2. BOUTON MENU BURGER MOBILE (Uniquement visible sur < lg) */}
      <div className="fixed left-3 top-3 z-40 lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            render={
              <Button size="icon" className="size-10 bg-navy text-white hover:bg-navy/90 border-none shadow-md">
                <Menu className="size-5 text-white" />
                <span className="sr-only">Ouvrir le menu navigation</span>
              </Button>
            }
          />
          
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="border-b p-4 text-left">
              <SheetTitle>
                <Link href="/admin" onClick={() => setMobileOpen(false)} className="font-heading text-lg font-bold text-navy">
                  AMEG <span className="text-orange">Admin</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex-1 overflow-y-auto p-3">
              <NavList onItemClick={() => setMobileOpen(false)} />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}