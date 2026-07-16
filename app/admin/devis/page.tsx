'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Eye } from 'lucide-react'
import { getAdminQuoteRequests } from '@/lib/admin-api'
import type { QuoteRequest } from '@/lib/types'
import { StatusBadge } from '@/components/admin/status-badge'
import { AdminPagination } from '@/components/admin/pagination'
import { paginationMeta } from '@/lib/api'

export default function AdminQuoteRequestsPage() {
  const [data, setData] = useState<{ items: QuoteRequest[]; lastPage: number } | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    getAdminQuoteRequests(page).then((res) => setData({ items: res.data, lastPage: paginationMeta(res).last_page }))
  }, [page])

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy">Demandes de devis</h1>
      <p className="mt-1 text-muted-foreground">Retrouve ici toutes les demandes envoyées depuis le site.</p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/40 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Client</th>
              <th className="px-4 py-3">Société</th>
              <th className="px-4 py-3">Produits</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {!data ? (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">Chargement...</td></tr>
            ) : data.items.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">Aucune demande de devis pour le moment.</td></tr>
            ) : (
              data.items.map((q) => (
                <tr key={q.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy">{q.first_name} {q.last_name}</p>
                    <p className="text-xs text-muted-foreground">{q.email}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{q.company ?? '—'}</td>
                  <td className="px-4 py-3 text-muted-foreground">{q.items?.length ?? 0} produit(s)</td>
                  <td className="px-4 py-3"><StatusBadge status={q.status} /></td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(q.created_at).toLocaleDateString('fr-FR')}</td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/devis/${q.id}`} className="inline-flex items-center gap-1.5 text-turquoise hover:underline">
                      <Eye className="size-4" /> Voir
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {data && <AdminPagination page={page} lastPage={data.lastPage} onChange={setPage} />}
    </div>
  )
}