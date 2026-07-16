'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send, Mail, Phone, Building2, MapPin } from 'lucide-react'
import { getAdminQuoteRequest, updateAdminQuoteRequest } from '@/lib/admin-api'
import type { QuoteRequest } from '@/lib/types'
import { StatusBadge } from '@/components/admin/status-badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function AdminQuoteRequestDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [quote, setQuote] = useState<QuoteRequest | null>(null)
  const [reply, setReply] = useState('')
  const [status, setStatus] = useState('nouveau')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getAdminQuoteRequest(Number(id)).then((q) => {
      setQuote(q)
      setReply(q.admin_reply ?? '')
      setStatus(q.status)
    })
  }, [id])

  async function handleSave() {
    setSaving(true)
    const updated = await updateAdminQuoteRequest(Number(id), { status, admin_reply: reply || undefined })
    setQuote(updated)
    setSaving(false)
  }

  if (!quote) return <p className="text-muted-foreground">Chargement...</p>

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/devis" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy">
        <ArrowLeft className="size-4" /> Retour aux devis
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-navy">{quote.first_name} {quote.last_name}</h1>
        <StatusBadge status={quote.status} />
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Reçu le {new Date(quote.created_at).toLocaleString('fr-FR')}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <InfoRow icon={Mail} label="Email" value={quote.email} href={`mailto:${quote.email}`} />
        <InfoRow icon={Phone} label="Téléphone" value={quote.phone} href={`tel:${quote.phone}`} />
        {quote.company && <InfoRow icon={Building2} label="Société" value={quote.company} />}
        {quote.city && <InfoRow icon={MapPin} label="Ville" value={quote.city} />}
      </div>

      {quote.comment && (
        <div className="mt-6 rounded-xl bg-muted/40 p-4">
          <p className="text-xs font-medium uppercase text-muted-foreground">Commentaire du client</p>
          <p className="mt-1 text-sm text-foreground">{quote.comment}</p>
        </div>
      )}

      <div className="mt-6">
        <h2 className="font-heading text-lg font-bold text-navy">Produits demandés</h2>
        <div className="mt-3 overflow-hidden rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/40 text-left text-xs uppercase text-muted-foreground">
              <tr><th className="px-4 py-2.5">Référence</th><th className="px-4 py-2.5">Produit</th><th className="px-4 py-2.5 text-right">Quantité</th></tr>
            </thead>
            <tbody className="divide-y">
              {quote.items?.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2.5 font-medium text-navy">{item.product_reference}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{item.product_name}</td>
                  <td className="px-4 py-2.5 text-right">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h2 className="font-heading text-lg font-bold text-navy">Traitement de la demande</h2>
        <div className="mt-4">
          <Label htmlFor="status" className="mb-2 block">Statut</Label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-turquoise">
            <option value="nouveau">Nouveau</option>
            <option value="en_cours">En cours</option>
            <option value="traite">Traité</option>
          </select>
        </div>
        <div className="mt-4">
          <Label htmlFor="reply" className="mb-2 block">Réponse / note interne</Label>
          <Textarea id="reply" rows={4} value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Note interne sur le traitement de cette demande..." />
        </div>
        <Button variant="cta" size="lg2" className="mt-5" onClick={handleSave} disabled={saving}>
          {saving ? 'Enregistrement...' : (<><Send className="size-4" /> Enregistrer</>)}
        </Button>
      </div>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value, href }: { icon: React.ElementType; label: string; value: string; href?: string }) {
  const content = (
    <div className="flex items-center gap-3 rounded-xl border border-border p-3.5">
      <span className="flex size-9 items-center justify-center rounded-lg bg-navy/5 text-navy"><Icon className="size-4" /></span>
      <div><p className="text-xs text-muted-foreground">{label}</p><p className="text-sm font-medium text-navy">{value}</p></div>
    </div>
  )
  return href ? <a href={href}>{content}</a> : content
}