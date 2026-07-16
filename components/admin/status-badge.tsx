const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  nouveau: { label: 'Nouveau', className: 'bg-orange/10 text-orange' },
  en_cours: { label: 'En cours', className: 'bg-turquoise/10 text-turquoise' },
  lu: { label: 'Lu', className: 'bg-turquoise/10 text-turquoise' },
  traite: { label: 'Traité', className: 'bg-navy/10 text-navy' },
}

export function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? { label: status, className: 'bg-muted text-muted-foreground' }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${style.className}`}>
      {style.label}
    </span>
  )
}