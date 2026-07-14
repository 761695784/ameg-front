import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Download, FileText, MessageCircle, ShieldCheck, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductGallery } from '@/components/catalogue/product-gallery'
import { AddToQuote } from '@/components/catalogue/add-to-quote'
import { ProductCard } from '@/components/catalogue/product-card'
import { SectionHeading } from '@/components/sections/section-heading'
import { getProduct, getSettings, storageUrl } from '@/lib/api'
import { resolveSettings, whatsappLink, AVAILABILITY_LABELS, formatPrice } from '@/lib/site'
import { cn } from '@/lib/utils'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const data = await getProduct(slug)
  if (!data) return { title: 'Produit' }
  const { product } = data
  return {
    title: product.name,
    description:
      product.description?.slice(0, 160) ??
      `${product.name} — ${product.brand?.name ?? ''}. Équipement de cuisine professionnelle disponible chez AMEG International.`,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [data, settingsRaw] = await Promise.all([getProduct(slug), getSettings()])

  if (!data) notFound()

  const { product, grouped_characteristics, similar_products } = data
  const settings = resolveSettings(settingsRaw)
  const availability = AVAILABILITY_LABELS[product.availability]
  const images = product.images ?? (product.primary_image ? [product.primary_image] : [])
  const groups = grouped_characteristics ?? {}
  const hasGroups = Object.keys(groups).length > 0

  const waLink = whatsappLink(
    settings.whatsapp_number,
    `Bonjour, je suis intéressé par le produit "${product.name}" (réf. ${product.reference}).`,
  )

  return (
    <>
      <div className="border-b bg-card">
        <nav className="container-ameg flex flex-wrap items-center gap-1 py-4 text-sm text-muted-foreground" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-turquoise">Accueil</Link>
          <ChevronRight className="size-3.5" />
          <Link href="/catalogue" className="hover:text-turquoise">Catalogue</Link>
          {product.category && (
            <>
              <ChevronRight className="size-3.5" />
              <Link href={`/catalogue?category_id=${product.category.id}`} className="hover:text-turquoise">
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="size-3.5" />
          <span className="text-navy">{product.name}</span>
        </nav>
      </div>

      <section className="bg-background py-10 md:py-14">
        <div className="container-ameg grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={images} name={product.name} />

          <div>
            {product.brand?.name && (
              <span className="text-sm font-semibold uppercase tracking-wide text-turquoise">
                {product.brand.name}
              </span>
            )}
            <h1 className="mt-1 font-heading text-3xl font-bold text-navy text-balance md:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">Référence : {product.reference}</p>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className={cn('rounded-full px-3 py-1 text-sm font-medium', availability.className)}>
                {availability.label}
              </span>
              <span className="text-lg font-bold text-navy">
                {formatPrice(product.price_fcfa) ?? 'Prix sur demande'}
              </span>
            </div>

            {product.description && (
              <p className="mt-5 leading-relaxed text-muted-foreground">{product.description}</p>
            )}

            <div className="mt-7">
              <AddToQuote product={product} />
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button variant="outline" size="lg2" className="flex-1" render={<Link href="/devis" />}>
                <FileText className="size-4" /> Demander un devis
              </Button>
              <Button
                variant="outline"
                size="lg2"
                className="flex-1 border-turquoise/40 text-turquoise hover:bg-accent"
                render={<a href={waLink} target="_blank" rel="noopener noreferrer" />}
              >
                <MessageCircle className="size-4" /> WhatsApp
              </Button>
            </div>

            <ul className="mt-7 grid gap-3 border-t pt-6 sm:grid-cols-2">
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <ShieldCheck className="size-5 text-turquoise" /> Produit garanti constructeur
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground">
                <Truck className="size-5 text-turquoise" /> Livraison &amp; installation
              </li>
            </ul>

            {product.documents && product.documents.length > 0 && (
              <div className="mt-6 border-t pt-6">
                <h2 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-navy">
                  Documents
                </h2>
                <div className="flex flex-col gap-2">
                  {product.documents.map((doc) => (
                    <a
                      key={doc.path}
                      href={storageUrl(doc.path) ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-navy transition-colors hover:bg-muted"
                    >
                      <Download className="size-4 text-turquoise" /> {doc.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {hasGroups && (
        <section className="bg-secondary/50 py-14 md:py-20">
          <div className="container-ameg max-w-4xl">
            <h2 className="mb-8 font-heading text-2xl font-bold text-navy">Caractéristiques techniques</h2>
            <div className="space-y-8">
              {Object.entries(groups).map(([group, chars]) => (
                <div key={group} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <h3 className="bg-navy px-5 py-3 font-heading text-sm font-bold uppercase tracking-wide text-white">
                    {group}
                  </h3>
                  <dl className="divide-y">
                    {chars.map((char, i) => (
                      <div key={i} className="flex justify-between gap-4 px-5 py-3 text-sm">
                        <dt className="text-muted-foreground">{char.caracteristique}</dt>
                        <dd className="text-right font-medium text-navy">
                          {char.valeur}
                          {char.unite ? ` ${char.unite}` : ''}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {similar_products && similar_products.length > 0 && (
        <section className="bg-background py-14 md:py-20">
          <div className="container-ameg">
            <SectionHeading align="left" eyebrow="À découvrir" title="Produits similaires" className="mb-8" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {similar_products.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
