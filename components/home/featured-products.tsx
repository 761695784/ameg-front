import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getProducts } from '@/lib/api'
import { ProductCard } from '@/components/catalogue/product-card'
import { SectionHeading } from '@/components/sections/section-heading'
import { Button } from '@/components/ui/button'

export async function FeaturedProducts() {
  const result = await getProducts({ is_featured: true, per_page: 8 })
  const products = result?.data ?? []

  if (products.length === 0) return null

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container-ameg">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            align="left"
            eyebrow="Sélection"
            title="Nos équipements phares"
            description="Une sélection des produits les plus demandés par les professionnels."
            className="mb-0 max-w-xl"
          />
          <Button variant="outline" size="lg2" render={<Link href="/catalogue" />}>
            Tout le catalogue <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
