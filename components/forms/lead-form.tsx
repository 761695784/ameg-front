'use client'

import { useState } from 'react'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { submitContactMessage, submitProjectStudyRequest, ApiError } from '@/lib/api'

interface LeadFormProps {
  variant?: 'contact' | 'etude'
  successTitle?: string
  successMessage?: string
}

export function LeadForm({
  variant = 'contact',
  successTitle = 'Message envoyé',
  successMessage = "Merci ! Nous vous répondrons dans les plus brefs délais.",
}: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const form = new FormData(e.currentTarget)
    const get = (key: string) => {
      const value = form.get(key)
      return typeof value === 'string' && value.trim() !== '' ? value.trim() : undefined
    }

    try {
      if (variant === 'etude') {
        // Le backend n'a pas de champs dédiés "surface"/"couverts" : on les intègre
        // proprement dans la description pour que l'admin les voie quand même.
        const descriptionParts = [get('message')]
        if (get('surface')) descriptionParts.push(`Surface de la cuisine : ${get('surface')} m²`)
        if (get('covers')) descriptionParts.push(`Nombre de couverts / jour : ${get('covers')}`)

        await submitProjectStudyRequest({
          name: get('name')!,
          company: get('company'),
          email: get('email')!,
          phone: get('phone')!,
          city: get('city'),
          establishment_type: get('type'),
          description: descriptionParts.filter(Boolean).join('\n\n'),
        })
      } else {
        await submitContactMessage({
          name: get('name')!,
          email: get('email')!,
          phone: get('phone'),
          subject: get('company') ? `Société : ${get('company')}` : undefined,
          message: get('message')!,
        })
      }

      setSubmitted(true)
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
      <div className="rounded-2xl border border-border bg-card p-10 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-turquoise/15 text-turquoise">
          <CheckCircle2 className="size-8" />
        </div>
        <h2 className="mt-5 font-heading text-2xl font-bold text-navy">{successTitle}</h2>
        <p className="mt-3 text-muted-foreground">{successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom complet" name="name" required />
        <Field label="Établissement / Société" name="company" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Téléphone" name="phone" type="tel" required />
        {variant === 'etude' && (
          <>
            <Field label="Ville" name="city" />
            <Field label="Type d'établissement" name="type" placeholder="Hôtel, restaurant, boulangerie..." />
            <Field label="Surface de la cuisine (m²)" name="surface" />
            <Field label="Nombre de couverts / jour" name="covers" />
          </>
        )}
      </div>
      <div className="mt-5">
        <Label htmlFor="message" className="mb-2 block">
          {variant === 'etude' ? 'Décrivez votre projet' : 'Votre message'}{' '}
          <span className="text-orange">*</span>
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder={
            variant === 'etude'
              ? 'Vos contraintes, votre planning, votre budget indicatif, vos plans existants...'
              : 'Comment pouvons-nous vous aider ?'
          }
        />
      </div>

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Button type="submit" variant="cta" size="xl" className="mt-6 w-full" disabled={loading}>
        {loading ? 'Envoi en cours...' : (<>Envoyer <Send className="size-4" /></>)}
      </Button>
    </form>
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
