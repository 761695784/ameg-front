'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { getRealisations, getServices } from '@/lib/api'
import { createAdminRealisation, updateAdminRealisation, deleteAdminRealisation } from '@/lib/admin-api'
import type { Realisation, Service } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

const SECTORS = [
  { value: 'hotels', label: 'Hôtels' },
  { value: 'restaurants', label: 'Restaurants' },
  { value: 'fast_foods', label: 'Fast-foods' },
  { value: 'boulangeries', label: 'Boulangeries' },
  { value: 'patisseries', label: 'Pâtisseries' },
  { value: 'collectivites', label: 'Collectivités' },
]

export default function AdminRealisationsPage() {
  const [realisations, setRealisations] = useState<Realisation[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Realisation | null>(null)
  const [selectedServices, setSelectedServices] = useState<number[]>([])

  async function reload() {
    setRealisations(await getRealisations())
  }

  useEffect(() => {
    reload()
    getServices().then(setServices)
  }, [])

  function openCreate() {
    setEditing(null)
    setSelectedServices([])
    setDialogOpen(true)
  }

  function openEdit(r: Realisation) {
    setEditing(r)
    setSelectedServices([]) // le endpoint public ne renvoie pas les IDs des services liés sur la liste
    setDialogOpen(true)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const data = {
      title: form.get('title') as string,
      sector: form.get('sector') as string,
      description: (form.get('description') as string) || undefined,
      service_ids: selectedServices,
    }
    if (editing) {
      await updateAdminRealisation(editing.id, data)
    } else {
      await createAdminRealisation(data)
    }
    setDialogOpen(false)
    reload()
  }

  async function handleDelete(r: Realisation) {
    if (!confirm(`Supprimer la réalisation "${r.title}" ?`)) return
    await deleteAdminRealisation(r.id)
    reload()
  }

  function toggleService(id: number) {
    setSelectedServices((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Réalisations</h1>
          <p className="mt-1 text-muted-foreground">Projets réalisés, classés par secteur.</p>
        </div>
        <Button variant="cta" size="lg2" onClick={openCreate}>
          <Plus className="size-4" /> Nouvelle réalisation
        </Button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {realisations.map((r) => (
          <div key={r.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-heading font-bold text-navy">{r.title}</p>
                <p className="mt-1 text-xs uppercase text-turquoise">
                  {SECTORS.find((s) => s.value === r.sector)?.label ?? r.sector}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => openEdit(r)} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-navy">
                  <Pencil className="size-4" />
                </button>
                <button type="button" onClick={() => handleDelete(r)} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? 'Modifier la réalisation' : 'Nouvelle réalisation'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title" className="mb-2 block">Titre du projet</Label>
              <Input id="title" name="title" required defaultValue={editing?.title} placeholder="Hôtel Le Flamboyant - Ziguinchor" />
            </div>
            <div>
              <Label htmlFor="sector" className="mb-2 block">Secteur</Label>
              <select id="sector" name="sector" required defaultValue={editing?.sector} className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-turquoise">
                {SECTORS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="description" className="mb-2 block">Description</Label>
              <Textarea id="description" name="description" rows={4} defaultValue={editing?.description ?? ''} placeholder="Contexte, problématique, solutions apportées, résultat..." />
            </div>
            <div>
              <Label className="mb-2 block">Services associés</Label>
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <button
                    type="button"
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      selectedServices.includes(service.id)
                        ? 'border-turquoise bg-turquoise/10 text-turquoise'
                        : 'border-border text-muted-foreground hover:border-turquoise'
                    }`}
                  >
                    {service.title}
                  </button>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" variant="cta">{editing ? 'Enregistrer' : 'Créer'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}