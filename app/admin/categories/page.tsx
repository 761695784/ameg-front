'use client'

import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, ChevronDown, ChevronRight } from 'lucide-react'
import { getCategories } from '@/lib/api'
import {
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory,
  createAdminSubcategory,
  deleteAdminSubcategory,
} from '@/lib/admin-api'
import type { Category } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [expanded, setExpanded] = useState<number | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [newSubName, setNewSubName] = useState<Record<number, string>>({})

  async function reload() {
    setCategories(await getCategories())
  }

  useEffect(() => {
    reload()
  }, [])

  function openCreate() {
    setEditing(null)
    setDialogOpen(true)
  }

  function openEdit(cat: Category) {
    setEditing(cat)
    setDialogOpen(true)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const data = {
      name: form.get('name') as string,
      description: (form.get('description') as string) || undefined,
    }
    if (editing) {
      await updateAdminCategory(editing.id, data)
    } else {
      await createAdminCategory(data)
    }
    setDialogOpen(false)
    reload()
  }

  async function handleDelete(cat: Category) {
    if (!confirm(`Supprimer la catégorie "${cat.name}" ? Les produits associés devront être reclassés.`)) return
    await deleteAdminCategory(cat.id)
    reload()
  }

  async function handleAddSubcategory(categoryId: number) {
    const name = newSubName[categoryId]?.trim()
    if (!name) return
    await createAdminSubcategory({ category_id: categoryId, name })
    setNewSubName((prev) => ({ ...prev, [categoryId]: '' }))
    reload()
  }

  async function handleDeleteSubcategory(id: number) {
    if (!confirm('Supprimer cette sous-catégorie ?')) return
    await deleteAdminSubcategory(id)
    reload()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Catégories</h1>
          <p className="mt-1 text-muted-foreground">Gère les 16 catégories du catalogue et leurs sous-catégories.</p>
        </div>
        <Button variant="cta" size="lg2" onClick={openCreate}>
          <Plus className="size-4" /> Nouvelle catégorie
        </Button>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {categories.map((cat) => (
          <div key={cat.id} className="rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between p-4">
              <button
                type="button"
                onClick={() => setExpanded(expanded === cat.id ? null : cat.id)}
                className="flex flex-1 items-center gap-2 text-left"
              >
                {expanded === cat.id ? <ChevronDown className="size-4 text-muted-foreground" /> : <ChevronRight className="size-4 text-muted-foreground" />}
                <span className="font-medium text-navy">{cat.name}</span>
                <span className="text-xs text-muted-foreground">
                  {cat.products_count ?? 0} produit(s) · {cat.subcategories?.length ?? 0} sous-catégorie(s)
                </span>
              </button>
              <div className="flex items-center gap-1">
                <button type="button" onClick={() => openEdit(cat)} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-navy">
                  <Pencil className="size-4" />
                </button>
                <button type="button" onClick={() => handleDelete(cat)} className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>

            {expanded === cat.id && (
              <div className="border-t px-4 py-3">
                <ul className="flex flex-wrap gap-2">
                  {cat.subcategories?.map((sub) => (
                    <li key={sub.id} className="inline-flex items-center gap-1.5 rounded-full bg-muted/60 px-3 py-1.5 text-xs">
                      {sub.name}
                      <button type="button" onClick={() => handleDeleteSubcategory(sub.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="size-3" />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex gap-2">
                  <Input
                    placeholder="Nouvelle sous-catégorie..."
                    value={newSubName[cat.id] ?? ''}
                    onChange={(e) => setNewSubName((prev) => ({ ...prev, [cat.id]: e.target.value }))}
                    className="h-9 max-w-xs"
                  />
                  <Button variant="outline" size="sm" onClick={() => handleAddSubcategory(cat.id)}>
                    <Plus className="size-3.5" /> Ajouter
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'Modifier la catégorie' : 'Nouvelle catégorie'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="mb-2 block">Nom</Label>
              <Input id="name" name="name" required defaultValue={editing?.name} />
            </div>
            <div>
              <Label htmlFor="description" className="mb-2 block">Description</Label>
              <Textarea id="description" name="description" rows={3} defaultValue={editing?.description ?? ''} />
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