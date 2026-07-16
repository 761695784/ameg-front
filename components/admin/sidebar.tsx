'use client'

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
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
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
  { href: '/admin/parametres', label: 'Paramètres', icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r bg-card lg:flex">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admin" className="font-heading text-lg font-bold text-navy">
          AMEG <span className="text-orange">Admin</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href)
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
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
      </nav>
    </aside>
  )
}