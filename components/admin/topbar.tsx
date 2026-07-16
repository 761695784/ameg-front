'use client'

import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { logoutAdmin } from '@/lib/auth'
import type { AdminUser } from '@/lib/types'

export function AdminTopbar({ user }: { user: AdminUser }) {
  const router = useRouter()

  async function handleLogout() {
    await logoutAdmin()
    router.replace('/admin/login')
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6 lg:px-8">
      <div className="lg:hidden font-heading text-lg font-bold text-navy">
        AMEG <span className="text-orange">Admin</span>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Connecté en tant que <span className="font-medium text-navy">{user.name}</span>
        </span>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="size-4" /> Déconnexion
        </Button>
      </div>
    </header>
  )
}