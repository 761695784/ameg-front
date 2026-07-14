'use client'

import { useState } from 'react'
import { Trash2, Send, CheckCircle2, Plus, Minus, AlertCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useQuoteCart } from '@/components/quote/quote-cart-provider'
import { submitQuoteRequest, ApiError } from '@/lib/api'

export function DevisForm() {
  const { items, removeItem, updateQuantity, clear } = useQuoteCart()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (items.length === 0) {
      setError('Ajoutez au moins un produit à votre sélection avant d\'envoyer la demande.')
      return
    }

    setLoading(true)
    setError(null)

    const form = new FormData(e.currentTarget)
    const get = (key: string) => {
      const value = form.get(key)
      return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined
    }

    // L'API attend first_name/last_name séparément : on découpe le champ "Nom complet".
    const fullName = get('name') ?? ''
    const [firstName, ...rest] = fullName.split(' ')
    const lastName = rest.length > 0 ? rest.join(' ') : firstName

    // Le champ "secteur" n'existe pas dans le contrat API : on l'intègre au commentaire.
    const commentParts = [
      get('sector') ? `Secteur d'activité : ${get('sector')}` : null,
      get('message') ?? null,
    ].filter(Boolean)

    try {
      await submitQuoteRequest({
        first_name: firstName,
        last_name: lastName,
        company: get('company'),
        phone: get('phone')!,
        email: get('email')!,
        city: get('city'),
        comment: commentParts.length > 0 ? commentParts.join('\n\n') : undefined,
        items: items.map((i) => ({ product_id: i.product_id, quantity: i.quantity })),
      })

      setSubmitted(true)
      clear()
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Une erreur est survenue lors de l'envoi. Merci de réessayer.",
      )
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-10 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-turquoise/15 text-turquoise">
          <CheckCircle2 className="size-8" />
        </div>
        <h2 className="mt-5 font-heading text-2xl font-bold text-navy">Demande envoyée</h2>
        <p className="mt-3 text-muted-foreground">
          Merci ! Votre demande de devis a bien été reçue. Notre équipe vous recontacte sous 24-48h ouvrées.
        </p>
        <Button variant="cta" className="mt-6" render={<Link href="/catalogue" />}>
          Continuer vers le catalogue
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
      <form onSubmit={handleSubmit} className="order-2 lg:order-1">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <h2 className="font-heading text-xl font-bold text-navy">Vos coordonnées</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label="Nom complet" name="name" required />
            <Field label="Établissement / Société" name="company" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Téléphone" name="phone" type="tel" required />
            <Field label="Ville" name="city" />
            <Field label="Secteur d'activité" name="sector" placeholder="Hôtel, restaurant..." />
          </div>
          <div className="mt-5">
            <Label htmlFor="message" className="mb-2 block">Message / précisions</Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Décrivez votre projet, vos contraintes, votre budget indicatif..."
            />
          </div>

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button type="submit" variant="cta" size="xl" className="mt-6 w-full" disabled={loading}>
            {loading ? 'Envoi en cours...' : (<>Envoyer ma demande <Send className="size-4" /></>)}
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            En envoyant ce formulaire, vous acceptez d'être recontacté par nos équipes.
          </p>
        </div>
      </form>

      <div className="order-1 lg:order-2">
        <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold text-navy">
              Votre sélection ({items.length})
            </h2>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="text-xs font-medium text-muted-foreground hover:text-destructive"
              >
                Tout vider
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-border py-10 text-center">
              <p className="text-sm text-muted-foreground">
                Aucun produit sélectionné.
              </p>
              <Button variant="outline" size="sm" className="mt-4" render={<Link href="/catalogue" />}>
                Parcourir le catalogue
              </Button>
            </div>
          ) : (
            <ul className="mt-5 space-y-4">
              {items.map((item) => (
                <li key={item.product_id} className="flex gap-3">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image src={item.image || '/images/cuisine-1.jpg'} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <span className="line-clamp-2 text-sm font-medium leading-snug text-foreground">
                      {item.name}
                    </span>
                    <span className="text-xs text-muted-foreground">Réf. {item.reference}</span>
                    <div className="mt-auto flex items-center gap-2">
                      <div className="flex items-center rounded-lg border border-border">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          className="flex size-7 items-center justify-center text-muted-foreground hover:text-navy"
                          aria-label="Diminuer la quantité"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="flex size-7 items-center justify-center text-muted-foreground hover:text-navy"
                          aria-label="Augmenter la quantité"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.product_id)}
                        className="ml-auto text-muted-foreground hover:text-destructive"
                        aria-label="Retirer du devis"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
}: {
  label: string
  name: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <Label htmlFor={name} className="mb-2 block">
        {label} {required && <span className="text-orange">*</span>}
      </Label>
      <Input id={name} name={name} type={type} required={required} placeholder={placeholder} />
    </div>
  )
}