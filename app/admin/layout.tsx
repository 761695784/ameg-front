'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { getCurrentAdmin } from '@/lib/auth'
import type { AdminUser } from '@/lib/types'
import { AdminSidebar } from '@/components/admin/sidebar'
import { AdminTopbar } from '@/components/admin/topbar'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [checking, setChecking] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === '/admin/login') {
      setChecking(false)
      return
    }
    getCurrentAdmin().then((u) => {
      if (!u) {
        router.replace('/admin/login')
      } else {
        setUser(u)
      }
      setChecking(false)
    })
  }, [pathname, router])

  // La page de login gère son propre layout (pas de sidebar/topbar dessus).
  if (pathname === '/admin/login') return <>{children}</>

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-2 border-navy border-t-transparent" />
      </div>
    )
  }

  if (!user) return null // redirection en cours

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex flex-col lg:pl-64">
        <AdminTopbar user={user} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}