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
    <header className="flex h-16 items-center justify-between border-b bg-card px-3 sm:px-6 lg:px-8">
      {/* Logo visible sur mobile/tablette */}
      <div className="font-heading text-base font-bold text-navy sm:text-lg lg:hidden">
        AMEG <span className="text-orange">Admin</span>
      </div>

      {/* Zone utilisateur + Déconnexion */}
      <div className="ml-auto flex items-center gap-2 sm:gap-4">
        {/* Masque "Connecté en tant que" sur très petit écran pour gagner de la place */}
        <span className="text-xs text-muted-foreground sm:text-sm">
          {/* <span className="hidden sm:inline">Connecté en tant que </span> */}
          <span className="font-medium text-navy">{user.name}</span>
        </span>

        {/* Bouton déconnexion : Icône seule sur mobile (<640px), Texte + Icône sur écran plus grand */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="h-8 px-2 sm:h-9 sm:px-3"
          title="Déconnexion"
        >
          <LogOut className="size-4" />
          <span className="hidden sm:inline">Déconnexion</span>
        </Button>
      </div>
    </header>
  )
}