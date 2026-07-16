'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getCategories, getBrands } from '@/lib/api'
import type { Category, Brand } from '@/lib/types'
import { ProductForm } from '@/components/admin/product-form'

export default function NewProductPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    getCategories().then(setCategories)
    getBrands().then(setBrands)
  }, [])

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/admin/produits" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-navy">
        <ArrowLeft className="size-4" /> Retour aux produits
      </Link>
      <h1 className="mt-4 font-heading text-2xl font-bold text-navy">Nouveau produit</h1>
      <div className="mt-6">
        <ProductForm categories={categories} brands={brands} />
      </div>
    </div>
  )
}