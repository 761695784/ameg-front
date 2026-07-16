'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Send, Mail, Phone, Building2, MapPin, FileText, Wallet, CalendarClock } from 'lucide-react'
import { getAdminProjectStudyRequest, updateAdminProjectStudyRequest } from '@/lib/admin-api'
import type { ProjectStudyRequest } from '@/lib/types'
import { API_ROOT } from '@/lib/api'
import { StatusBadge } from '@/components/admin/status-badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export default function AdminProjectStudyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [request, setRequest] = useState<ProjectStudyRequest | null>(null)
  const [reply, setReply] = useState('')
  const [status, setStatus] = useState('nouveau')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getAdminProjectStudyRequest(Number(id)).then((r) => {
      setRequest(r)
      setReply(r.admin_reply ?? '')
      setStatus(r.status)
    })
  }, [id])

  async function handleSave() {
    setSaving(true)
    const updated = await updateAdminProjectStudyRequest(Number(id), { status, admin_reply: reply || undefined })
    setRequest(updated)
    setSaving(false)
  }

  if (!request) return <p className="text-muted-foreground">Chargement...</p>

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/etudes-projet" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy">
        <ArrowLeft className="size-4" /> Retour aux études de projet
      </Link>

      <div className="mt-4 flex items-center justify-between">
        <h1 className="font-heading text-2xl font-bold text-navy">{request.name}</h1>
        <StatusBadge status={request.status} />
      </div>
      <p className="mt-1 text-sm text-muted-foreground">Reçu le {new Date(request.created_at).toLocaleString('fr-FR')}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <InfoRow icon={Mail} label="Email" value={request.email} href={`mailto:${request.email}`} />
        <InfoRow icon={Phone} label="Téléphone" value={request.phone} href={`tel:${request.phone}`} />
        {request.company && <InfoRow icon={Building2} label="Société" value={request.company} />}
        {request.city && <InfoRow icon={MapPin} label="Ville" value={request.city} />}
        {request.establishment_type && <InfoRow icon={Building2} label="Type d'établissement" value={request.establishment_type} />}
        {request.estimated_budget && <InfoRow icon={Wallet} label="Budget estimé" value={request.estimated_budget} />}
        {request.desired_deadline && <InfoRow icon={CalendarClock} label="Délai souhaité" value={request.desired_deadline} />}
      </div>

      <div className="mt-6 rounded-xl bg-muted/40 p-4">
        <p className="text-xs font-medium uppercase text-muted-foreground">Description du projet</p>
        <p className="mt-1 whitespace-pre-line text-sm text-foreground">{request.description}</p>
      </div>

      {request.documents && request.documents.length > 0 && (
        <div className="mt-6">
          <h2 className="font-heading text-lg font-bold text-navy">Documents joints</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {request.documents.map((doc) => (
              <li key={doc.id}>
                <a href={`${API_ROOT}/storage/${doc.path}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-navy hover:border-turquoise hover:text-turquoise">
                  <FileText className="size-4" /> {doc.original_name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

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