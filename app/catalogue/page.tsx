import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PackageSearch } from 'lucide-react'
import { HeroSection } from '@/components/sections/hero-section'
import { CatalogueFilters } from '@/components/catalogue/catalogue-filters'
import { CataloguePagination } from '@/components/catalogue/catalogue-pagination'
import { ProductCard } from '@/components/catalogue/product-card'
import { getBrands, getCategories, getProducts, paginationMeta } from '@/lib/api'
import { CATEGORY_TAXONOMY } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Catalogue',
  description:
    "Parcourez notre catalogue d'équipements de cuisine professionnelle : cuisson, froid, laverie, boulangerie, mobilier inox et plus encore.",
}

const PER_PAGE = 12

export default async function CataloguePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>
}) {
  const params = await searchParams
  const page = Number(params.page ?? 1)

  const [liveCategories, brands, result] = await Promise.all([
    getCategories(),
    getBrands(),
    getProducts({
      q: params.q,
      category_id: params.category_id,
      subcategory_id: params.subcategory_id,
      brand_id: params.brand_id,
      availability: params.availability,
      sort: params.sort,
      page,
      per_page: PER_PAGE,
    }),
  ])

  const categories = liveCategories.length > 0 ? liveCategories : CATEGORY_TAXONOMY
  const products = result?.data ?? []
  const meta = result ? paginationMeta(result) : null

  const activeCategory = params.category_id
    ? categories.find((c) => String(c.id) === params.category_id)
    : undefined

  return (
    <>
      <HeroSection
        priority
        size="sm"
        image="/images/hero-catalogue.jpg"
        imageAlt="Catalogue d'équipements de cuisine professionnelle"
        eyebrow="Catalogue"
        title={activeCategory ? activeCategory.name : 'Tout notre matériel professionnel'}
        subtitle={
          params.q
            ? `Résultats pour « ${params.q} »`
            : 'Filtrez par catégorie, marque et disponibilité pour trouver l\'équipement adapté.'
        }
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Catalogue', href: activeCategory ? '/catalogue' : undefined },
          ...(activeCategory ? [{ label: activeCategory.name }] : []),
        ]}
      />

      <section className="bg-background py-12 md:py-16">
        <div className="container-ameg grid gap-8 lg:grid-cols-[280px_1fr]">
          <Suspense fallback={null}>
            <CatalogueFilters categories={categories} brands={brands} />
          </Suspense>

          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {meta ? (
                  <>
                    <span className="font-semibold text-navy">{meta.total}</span> produit
                    {meta.total > 1 ? 's' : ''}
                  </>
                ) : (
                  'Chargement...'
                )}
              </p>
            </div>

            {products.length > 0 ? (
              <>
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {meta && (
                  <Suspense fallback={null}>
                    <CataloguePagination currentPage={meta.current_page} lastPage={meta.last_page} />
                  </Suspense>
                )}
              </>
            ) : (
              <EmptyState connected={result !== null} />
            )}
          </div>
        </div>
      </section>
    </>
  )
}

function EmptyState({ connected }: { connected: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card py-20 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <PackageSearch className="size-7" />
      </div>
      <h2 className="mt-5 font-heading text-lg font-bold text-navy">
        {connected ? 'Aucun produit trouvé' : 'Catalogue en cours de connexion'}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {connected
          ? 'Essayez de modifier ou de réinitialiser vos filtres pour élargir votre recherche.'
          : "Le catalogue produit sera disponible dès que l'API sera connectée. Vous pouvez déjà nous contacter pour un devis."}
      </p>
    </div>
  )
}
