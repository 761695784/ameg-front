'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, Send } from 'lucide-react'
import { getAdminContactMessage, updateAdminContactMessage } from '@/lib/admin-api'
import type { ContactMessage } from '@/lib/types'
import { StatusBadge } from '@/components/admin/status-badge'
import { Button } from '@/components/ui/button'

export default function AdminContactMessageDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [message, setMessage] = useState<ContactMessage | null>(null)
  const [status, setStatus] = useState('nouveau')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // Le simple fait d'ouvrir cette page marque automatiquement le message "lu" côté backend.
    getAdminContactMessage(Number(id)).then((m) => {
      setMessage(m)
      setStatus(m.status)
    })
  }, [id])

  async function handleSave() {
    setSaving(true)
    const updated = await updateAdminContactMessage(Number(id), status)
    setMessage(updated)
    setSaving(false)
  }

  if (!message) return <p className="text-muted-foreground">Chargement...</p>

  return (
    <div className="mx-auto max-w-2xl">
      <Link href="/admin/messages" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy">
        <ArrowLeft className="size-4" /> Retour aux messages
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-navy">{message.name}</h1>
        <StatusBadge status={message.status} />
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Reçu le {new Date(message.created_at).toLocaleString('fr-FR')}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <a href={`mailto:${message.email}`} className="flex items-center gap-3 rounded-xl border border-border p-3.5">
          <span className="flex size-9 items-center justify-center rounded-lg bg-navy/5 text-navy"><Mail className="size-4" /></span>
          <div><p className="text-xs text-muted-foreground">Email</p><p className="text-sm font-medium text-navy">{message.email}</p></div>
        </a>
        {message.phone && (
          <a href={`tel:${message.phone}`} className="flex items-center gap-3 rounded-xl border border-border p-3.5">
            <span className="flex size-9 items-center justify-center rounded-lg bg-navy/5 text-navy"><Phone className="size-4" /></span>
            <div><p className="text-xs text-muted-foreground">Téléphone</p><p className="text-sm font-medium text-navy">{message.phone}</p></div>
          </a>
        )}
      </div>

      {message.subject && <p className="mt-6 text-sm"><span className="font-medium text-navy">Sujet : </span>{message.subject}</p>}

      <div className="mt-4 rounded-xl bg-muted/40 p-4">
        <p className="whitespace-pre-line text-sm text-foreground">{message.message}</p>
      </div>

      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-card p-6">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 flex-1 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-turquoise">
          <option value="nouveau">Nouveau</option>
          <option value="lu">Lu</option>
          <option value="traite">Traité</option>
        </select>
        <Button variant="cta" size="lg2" onClick={handleSave} disabled={saving}>
          {saving ? 'Enregistrement...' : (<><Send className="size-4" /> Mettre à jour</>)}
        </Button>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Pour répondre, utilise le bouton email ci-dessus (ouvre ton client mail habituel) — la table des messages de contact n'a pas de champ "réponse" côté backend.
      </p>
    </div>
  )
}