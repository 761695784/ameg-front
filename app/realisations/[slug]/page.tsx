import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, MapPin } from 'lucide-react'
import { getRealisations, storageUrl } from '@/lib/api'
import { CTASection } from '@/components/sections/cta-section'
import { SECTORS } from '@/lib/site'

async function findRealisation(slug: string) {
  const all = await getRealisations()
  return all.find((r) => r.slug === slug) ?? null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const realisation = await findRealisation(slug)
  if (!realisation) return { title: 'Réalisation' }
  return {
    title: realisation.title,
    description: realisation.short_description ?? undefined,
  }
}

export default async function RealisationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const realisation = await findRealisation(slug)
  if (!realisation) notFound()

  const cover = storageUrl(realisation.cover_image) ?? '/images/cuisine-2.jpg'
  const sectorLabel = SECTORS.find((s) => s.value === realisation.sector)?.label
  const gallery = (realisation.images ?? []).map((img) => storageUrl(img.path) ?? cover)

  return (
    <>
      <section className="relative flex min-h-[52vh] items-end overflow-hidden bg-navy">
        <Image
          src={cover || "/placeholder.svg"}
          alt={realisation.title}
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
        <div className="container-ameg relative z-10 pb-12 pt-28">
          <nav className="mb-4 flex items-center gap-1.5 text-sm text-white/70">
            <Link href="/" className="hover:text-white">Accueil</Link>
            <ChevronRight className="size-3.5" />
            <Link href="/realisations" className="hover:text-white">Réalisations</Link>
          </nav>
          {sectorLabel && (
            <span className="inline-block rounded-full bg-turquoise px-3 py-1 text-xs font-semibold text-turquoise-foreground">
              {sectorLabel}
            </span>
          )}
          <h1 className="mt-4 max-w-3xl font-heading text-3xl font-bold text-white text-balance md:text-5xl">
            {realisation.title}
          </h1>
          {realisation.location && (
            <p className="mt-3 flex items-center gap-1.5 text-white/80">
              <MapPin className="size-4" /> {realisation.location}
            </p>
          )}
        </div>
      </section>

      <section className="bg-background py-12 md:py-16">
        <div className="container-ameg max-w-3xl">
          <p className="text-lg leading-relaxed text-foreground">
            {realisation.description ?? realisation.short_description}
          </p>
        </div>

        {gallery.length > 0 && (
          <div className="container-ameg mt-10 grid gap-4 md:grid-cols-2">
            {gallery.map((src, i) => (
              <div key={i} className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={src || "/placeholder.svg"}
                  alt={`${realisation.title} — vue ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <CTASection title="Un projet similaire ?" description="Parlons de votre cuisine professionnelle." />
    </>
  )
}
