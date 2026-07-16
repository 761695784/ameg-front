'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { getBrands } from '@/lib/api'
import { createAdminBrand, updateAdminBrand, deleteAdminBrand } from '@/lib/admin-api'
import type { Brand } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Brand | null>(null)

  async function reload() {
    setBrands(await getBrands())
  }

  useEffect(() => {
    reload()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const data = { name: form.get('name') as string }
    if (editing) {
      await updateAdminBrand(editing.id, data)
    } else {
      await createAdminBrand(data)
    }
    setDialogOpen(false)
    reload()
  }

  async function handleDelete(brand: Brand) {
    if (!confirm(`Supprimer la marque "${brand.name}" ?`)) return
    await deleteAdminBrand(brand.id)
    reload()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Marques</h1>
          <p className="mt-1 text-muted-foreground">Les marques associées à tes produits (Adler, Bosch, Codigel...).</p>
        </div>
        <Button variant="cta" size="lg2" onClick={() => { setEditing(null); setDialogOpen(true) }}>
          <Plus className="size-4" /> Nouvelle marque
        </Button>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <div key={brand.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
            <div>
              <p className="font-medium text-navy">{brand.name}</p>
              <p className="text-xs text-muted-foreground">{brand.products_count ?? 0} produit(s)</p>
            </div>
            <div className="flex items-center gap-1">
              <button type="button" onClick={() => { setEditing(brand); setDialogOpen(true) }} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-navy">
                <Pencil className="size-4" />
              </button>
              <button type="button" onClick={() => handleDelete(brand)} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'Modifier la marque' : 'Nouvelle marque'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="mb-2 block">Nom de la marque</Label>
              <Input id="name" name="name" required defaultValue={editing?.name} />
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