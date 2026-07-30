'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Eye } from 'lucide-react'
import { getAdminContactMessages } from '@/lib/admin-api'
import type { ContactMessage } from '@/lib/types'
import { StatusBadge } from '@/components/admin/status-badge'
import { AdminPagination } from '@/components/admin/pagination'
import { paginationMeta } from '@/lib/api'

export default function AdminContactMessagesPage() {
  const [data, setData] = useState<{ items: ContactMessage[]; lastPage: number } | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    getAdminContactMessages(page).then((res) => setData({ items: res.data, lastPage: paginationMeta(res).last_page }))
  }, [page])

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-navy sm:text-2xl">Messages de contact</h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          Messages envoyés depuis le formulaire de contact du site.
        </p>
      </div>

      {/* overflow-x-auto pour activer le scroll horizontal sur mobile */}
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        {/* min-w-[650px] fixe la largeur min du tableau pour declencher le scroll */}
        <table className="w-full min-w-[650px] text-sm">
          <thead className="border-b bg-muted/40 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Expéditeur</th>
              <th className="px-4 py-3">Sujet</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {!data ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                  Chargement...
                </td>
              </tr>
            ) : data.items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                  Aucun message pour le moment.
                </td>
              </tr>
            ) : (
              data.items.map((m) => (
                <tr key={m.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.email}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{m.subject ?? '—'}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={m.status} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(m.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/messages/${m.id}`}
                      className="inline-flex items-center gap-1.5 text-turquoise hover:underline"
                    >
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