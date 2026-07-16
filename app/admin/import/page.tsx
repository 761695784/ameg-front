'use client'

import { useState } from 'react'
import { Upload, FileSpreadsheet, FileArchive, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { importCatalog, type CatalogImportReport } from '@/lib/admin-api'
import { ApiError } from '@/lib/api'

export default function AdminImportPage() {
  const [catalogFile, setCatalogFile] = useState<File | null>(null)
  const [imagesZip, setImagesZip] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [report, setReport] = useState<CatalogImportReport | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!catalogFile) {
      setError('Sélectionne le fichier Excel du catalogue.')
      return
    }

    setLoading(true)
    setError(null)
    setReport(null)

    try {
      const result = await importCatalog(catalogFile, imagesZip)
      setReport(result.report)
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Erreur lors de l'import. Vérifie la taille des fichiers et réessaie.",
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-heading text-2xl font-bold text-navy">Import du catalogue</h1>
      <p className="mt-1 text-muted-foreground">
        Importe le fichier Excel (feuilles Produits, Caracteristiques, Images) et le ZIP des photos produits.
        Réimporter le même fichier est sans danger : les produits existants sont mis à jour, pas dupliqués.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8">
        <FileDropZone
          label="Fichier Excel du catalogue"
          hint="Format .xlsx — feuilles Produits, Caracteristiques, Images"
          icon={FileSpreadsheet}
          accept=".xlsx,.xls,.csv"
          file={catalogFile}
          onChange={setCatalogFile}
          required
        />

        <div className="mt-5">
          <FileDropZone
            label="ZIP des images produits (optionnel)"
            hint="Un seul fichier .zip contenant toutes les images référencées"
            icon={FileArchive}
            accept=".zip"
            file={imagesZip}
            onChange={setImagesZip}
          />
        </div>

        {error && (
          <div className="mt-5 flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <Button type="submit" variant="cta" size="xl" className="mt-6 w-full" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Import en cours... (peut prendre plusieurs minutes)
            </>
          ) : (
            <>
              <Upload className="size-4" /> Lancer l'import
            </>
          )}
        </Button>
      </form>

      {report && <ImportReportCard report={report} />}
    </div>
  )
}

function FileDropZone({
  label,
  hint,
  icon: Icon,
  accept,
  file,
  onChange,
  required,
}: {
  label: string
  hint: string
  icon: React.ElementType
  accept: string
  file: File | null
  onChange: (file: File | null) => void
  required?: boolean
}) {
  return (
    <label className="block cursor-pointer rounded-xl border-2 border-dashed border-border p-6 text-center transition-colors hover:border-turquoise hover:bg-turquoise/5">
      <input
        type="file"
        accept={accept}
        required={required}
        className="hidden"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      <Icon className="mx-auto size-8 text-muted-foreground" />
      <p className="mt-3 font-medium text-navy">{label}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
      {file && (
        <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-turquoise/10 px-3 py-1 text-xs font-medium text-turquoise">
          <CheckCircle2 className="size-3.5" /> {file.name} ({(file.size / 1024 / 1024).toFixed(1)} Mo)
        </p>
      )}
    </label>
  )
}

function ImportReportCard({ report }: { report: CatalogImportReport }) {
  const stats = [
    { label: 'Produits créés', value: report.produits_crees },
    { label: 'Produits mis à jour', value: report.produits_mis_a_jour },
    { label: 'Catégories créées', value: report.categories_creees },
    { label: 'Sous-catégories créées', value: report.sous_categories_creees },
    { label: 'Marques créées', value: report.marques_creees },
    { label: 'Caractéristiques importées', value: report.caracteristiques_importees },
    { label: 'Images importées', value: report.images_importees },
  ]

  return (
    <div className="mt-6 rounded-2xl border border-border bg-card p-6 md:p-8">
      <div className="flex items-center gap-2 text-turquoise">
        <CheckCircle2 className="size-5" />
        <h2 className="font-heading text-lg font-bold text-navy">Import terminé</h2>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-muted/50 p-4">
            <p className="text-2xl font-bold text-navy">{s.value}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {report.images_manquantes.length > 0 && (
        <div className="mt-5 rounded-lg bg-orange/10 p-4">
          <p className="flex items-center gap-2 text-sm font-medium text-orange">
            <AlertTriangle className="size-4" /> {report.images_manquantes.length} image(s) introuvable(s)
          </p>
          <ul className="mt-2 max-h-32 overflow-y-auto text-xs text-muted-foreground">
            {report.images_manquantes.map((img) => (
              <li key={img}>{img}</li>
            ))}
          </ul>
        </div>
      )}

      {report.erreurs.length > 0 && (
        <div className="mt-4 rounded-lg bg-destructive/10 p-4">
          <p className="flex items-center gap-2 text-sm font-medium text-destructive">
            <AlertTriangle className="size-4" /> Avertissements
          </p>
          <ul className="mt-2 max-h-32 overflow-y-auto text-xs text-muted-foreground">
            {report.erreurs.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}