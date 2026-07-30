'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Eye } from 'lucide-react'
import { getAdminProjectStudyRequests } from '@/lib/admin-api'
import type { ProjectStudyRequest } from '@/lib/types'
import { StatusBadge } from '@/components/admin/status-badge'
import { AdminPagination } from '@/components/admin/pagination'
import { paginationMeta } from '@/lib/api'

export default function AdminProjectStudyRequestsPage() {
  const [data, setData] = useState<{ items: ProjectStudyRequest[]; lastPage: number } | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    getAdminProjectStudyRequests(page).then((res) =>
      setData({ items: res.data, lastPage: paginationMeta(res).last_page })
    )
  }, [page])

  return (
    <div className="w-full space-y-6">
      <div>
        <h1 className="font-heading text-xl font-bold text-navy sm:text-2xl">Études de projet</h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          Demandes d'accompagnement pour équiper un établissement complet.
        </p>
      </div>

      {/* overflow-x-auto active le défilement horizontal sur mobile */}
      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        {/* min-w-[700px] garantit que le tableau conserve sa structure et déclenche le scroll */}
        <table className="w-full min-w-[700px] text-sm">
          <thead className="border-b bg-muted/40 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Demandeur</th>
              <th className="px-4 py-3">Établissement</th>
              <th className="px-4 py-3">Ville</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y">
            {!data ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                  Chargement...
                </td>
              </tr>
            ) : data.items.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                  Aucune étude de projet pour le moment.
                </td>
              </tr>
            ) : (
              data.items.map((s) => (
                <tr key={s.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <p className="font-medium text-navy">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.email}</p>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{s.establishment_type ?? '—'}</td>
                  <td className="px-4 py-3 text-muted-foreground">{s.city ?? '—'}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(s.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/etudes-projet/${s.id}`}
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