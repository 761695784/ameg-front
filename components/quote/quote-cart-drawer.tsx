'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { useQuoteCart } from './quote-cart-provider'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'

export function QuoteCartDrawer() {
  const { items, isOpen, setOpen, removeItem, updateQuantity, count } = useQuoteCart()

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-b px-6 py-5">
          <SheetTitle className="flex items-center gap-2 font-heading text-navy">
            <ShoppingCart className="size-5 text-orange" />
            Panier de devis
            {count > 0 && (
              <span className="rounded-full bg-orange px-2 py-0.5 text-xs font-semibold text-orange-foreground">
                {count}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-muted">
              <ShoppingCart className="size-7 text-muted-foreground" />
            </div>
            <p className="font-heading text-lg font-semibold text-navy">Votre panier est vide</p>
            <p className="text-sm text-muted-foreground">
              Ajoutez des produits depuis le catalogue pour constituer votre demande de devis.
            </p>
            <Button variant="outline" size="lg2" onClick={() => setOpen(false)} render={<Link href="/catalogue" />}>
              Parcourir le catalogue
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="flex flex-col divide-y">
                {items.map((item) => (
                  <li key={item.product_id} className="flex gap-3 py-4">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="flex size-full items-center justify-center text-muted-foreground">
                          <ShoppingCart className="size-5" />
                        </div>
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <Link
                        href={`/catalogue/${item.slug}`}
                        className="line-clamp-2 text-sm font-medium text-navy hover:text-turquoise"
                        onClick={() => setOpen(false)}
                      >
                        {item.name}
                      </Link>
                      <span className="mt-0.5 text-xs text-muted-foreground">Réf. {item.reference}</span>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-lg border">
                          <button
                            type="button"
                            aria-label="Diminuer la quantité"
                            className="flex size-7 items-center justify-center text-muted-foreground hover:text-navy"
                            onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label="Augmenter la quantité"
                            className="flex size-7 items-center justify-center text-muted-foreground hover:text-navy"
                            onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          aria-label="Retirer du panier"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeItem(item.product_id)}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <SheetFooter className="border-t px-6 py-4">
              <Button
                variant="cta"
                size="xl"
                className="w-full"
                onClick={() => setOpen(false)}
                render={<Link href="/devis" />}
              >
                Finaliser ma demande de devis
              </Button>
              <p className="mt-2 text-center text-xs text-muted-foreground">
                Réponse sous 24h — sans engagement
              </p>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
