'use client'

import { useState } from 'react'
import { Eye, EyeOff, LogIn, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AdminLoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    // Placeholder: wire to the Laravel/Sanctum admin auth endpoint when available.
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)
    setError("Connexion à l'espace d'administration bientôt disponible.")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label htmlFor="email" className="mb-2 block">Adresse email</Label>
        <Input id="email" name="email" type="email" required placeholder="admin@ameginternational.com" autoComplete="email" />
      </div>
      <div>
        <Label htmlFor="password" className="mb-2 block">Mot de passe</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            required
            placeholder="••••••••"
            autoComplete="current-password"
            className="pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground hover:text-navy"
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>

      {error && (
        <p className="rounded-lg bg-orange/10 px-4 py-3 text-sm text-orange" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" variant="cta" size="xl" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Connexion...
          </>
        ) : (
          <>
            <LogIn className="size-4" /> Se connecter
          </>
        )}
      </Button>
    </form>
  )
}
