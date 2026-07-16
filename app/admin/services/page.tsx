'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { getServices } from '@/lib/api'
import { createAdminService, updateAdminService, deleteAdminService } from '@/lib/admin-api'
import type { Service } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Service | null>(null)

  async function reload() {
    setServices(await getServices())
  }

  useEffect(() => {
    reload()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const data = {
      title: form.get('title') as string,
      short_description: (form.get('short_description') as string) || undefined,
      description: (form.get('description') as string) || undefined,
    }
    if (editing) {
      await updateAdminService(editing.id, data)
    } else {
      await createAdminService(data)
    }
    setDialogOpen(false)
    reload()
  }

  async function handleDelete(service: Service) {
    if (!confirm(`Supprimer le service "${service.title}" ?`)) return
    await deleteAdminService(service.id)
    reload()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Services</h1>
          <p className="mt-1 text-muted-foreground">Étude de projet, installation, maintenance, SAV...</p>
        </div>
        <Button variant="cta" size="lg2" onClick={() => { setEditing(null); setDialogOpen(true) }}>
          <Plus className="size-4" /> Nouveau service
        </Button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {services.map((service) => (
          <div key={service.id} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-heading font-bold text-navy">{service.title}</p>
                {service.short_description && (
                  <p className="mt-1 text-sm text-muted-foreground">{service.short_description}</p>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => { setEditing(service); setDialogOpen(true) }} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-navy">
                  <Pencil className="size-4" />
                </button>
                <button type="button" onClick={() => handleDelete(service)} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'Modifier le service' : 'Nouveau service'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title" className="mb-2 block">Titre</Label>
              <Input id="title" name="title" required defaultValue={editing?.title} />
            </div>
            <div>
              <Label htmlFor="short_description" className="mb-2 block">Description courte</Label>
              <Input id="short_description" name="short_description" defaultValue={editing?.short_description ?? ''} placeholder="Résumé en une phrase" />
            </div>
            <div>
              <Label htmlFor="description" className="mb-2 block">Description complète</Label>
              <Textarea id="description" name="description" rows={4} defaultValue={editing?.description ?? ''} />
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