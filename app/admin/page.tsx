'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Package, FileText, ClipboardList, Mail, FolderTree, Tags, AlertTriangle } from 'lucide-react'
import { getCategories, getBrands } from '@/lib/api'
import { getAdminProducts, getAdminQuoteRequests, getAdminProjectStudyRequests, getAdminContactMessages } from '@/lib/admin-api'
import { paginationMeta } from '@/lib/api'

interface Stats {
  products: number
  categories: number
  brands: number
  quoteRequests: number
  projectStudyRequests: number
  contactMessages: number
  newQuoteRequests: number
  newProjectStudyRequests: number
  newContactMessages: number
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  useEffect(() => {
    Promise.allSettled([
      getCategories(),
      getBrands(),
      getAdminProducts(1),
      getAdminQuoteRequests(1),
      getAdminProjectStudyRequests(1),
      getAdminContactMessages(1),
    ]).then((results) => {
      const [categoriesR, brandsR, productsR, quotesR, studiesR, messagesR] = results
      const newErrors: string[] = []

      results.forEach((r, i) => {
        if (r.status === 'rejected') {
          const labels = ['categories', 'brands', 'products', 'quote-requests', 'project-study-requests', 'contact-messages']
          console.error(`[Dashboard] Échec sur "${labels[i]}" :`, r.reason)
          newErrors.push(`${labels[i]} : ${r.reason?.message ?? 'erreur inconnue'}`)
        }
      })

      setErrors(newErrors)
    setStats({
              products: productsR.status === 'fulfilled' ? paginationMeta(productsR.value).total : 0,
              categories: categoriesR.status === 'fulfilled' ? categoriesR.value.length : 0,
              brands: brandsR.status === 'fulfilled' ? brandsR.value.length : 0,
              quoteRequests: quotesR.status === 'fulfilled' ? paginationMeta(quotesR.value).total : 0,
              projectStudyRequests: studiesR.status === 'fulfilled' ? paginationMeta(studiesR.value).total : 0,
              contactMessages: messagesR.status === 'fulfilled' ? paginationMeta(messagesR.value).total : 0,
              newQuoteRequests: quotesR.status === 'fulfilled' ? quotesR.value.data.filter((q) => q.status === 'nouveau').length : 0,
              newProjectStudyRequests: studiesR.status === 'fulfilled' ? studiesR.value.data.filter((s) => s.status === 'nouveau').length : 0,
              newContactMessages: messagesR.status === 'fulfilled' ? messagesR.value.data.filter((m) => m.status === 'nouveau').length : 0,
            })
    })
  }, [])

  const cards = stats
    ? [
        { label: 'Produits au catalogue', value: stats.products, icon: Package, href: '/admin/produits', color: 'bg-navy/10 text-navy' },
        { label: 'Catégories', value: stats.categories, icon: FolderTree, href: '/admin/categories', color: 'bg-turquoise/10 text-turquoise' },
        { label: 'Marques', value: stats.brands, icon: Tags, href: '/admin/marques', color: 'bg-orange/10 text-orange' },
        { label: 'Demandes de devis', value: stats.quoteRequests, badge: stats.newQuoteRequests, icon: FileText, href: '/admin/devis', color: 'bg-navy/10 text-navy' },
        { label: 'Études de projet', value: stats.projectStudyRequests, badge: stats.newProjectStudyRequests, icon: ClipboardList, href: '/admin/etudes-projet', color: 'bg-turquoise/10 text-turquoise' },
        { label: 'Messages de contact', value: stats.contactMessages, badge: stats.newContactMessages, icon: Mail, href: '/admin/messages', color: 'bg-orange/10 text-orange' },
      ]
    : []

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy">Tableau de bord</h1>
      <p className="mt-1 text-muted-foreground">Vue d'ensemble de l'activité AMEG International.</p>

      {errors.length > 0 && (
        <div className="mt-4 flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 size-4 shrink-0" />
          <div>
            <p className="font-medium">Certaines statistiques n'ont pas pu être chargées :</p>
            <ul className="mt-1 list-inside list-disc">
              {errors.map((e, i) => <li key={i}>{e}</li>)}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {!stats
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 animate-pulse rounded-2xl border border-border bg-card" />
            ))
          : cards.map((card) => (
              <Link
                key={card.label}
                href={card.href}
                className="group relative rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                {!!card.badge && card.badge > 0 && (
                  <span className="absolute right-4 top-4 rounded-full bg-orange px-2 py-0.5 text-xs font-bold text-orange-foreground">
                    {card.badge} nouveau{card.badge > 1 ? 'x' : ''}
                  </span>
                )}
                <span className={`flex size-11 items-center justify-center rounded-xl ${card.color}`}>
                  <card.icon className="size-5" />
                </span>
                <p className="mt-4 text-3xl font-bold text-navy">{card.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{card.label}</p>
              </Link>
            ))}
      </div>
    </div>
  )
}