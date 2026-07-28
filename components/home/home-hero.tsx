'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, PhoneCall } from 'lucide-react'
import { Button } from '@/components/ui/button'

const slides = [
  {
    src: '/images/hero-accueil-1.jpg',
    alt: 'Laboratoire de pâtisserie professionnel équipé par AMEG',
  },
  {
    src: '/images/hero-accueil-3.jpg',
    alt: 'Cuisine centrale professionnelle en inox',
  },
  {
    src: '/images/hero-accueil-2.jpg',
    alt: 'Ligne de cuisson professionnelle en acier inoxydable',
  },
]

export function HomeHero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % slides.length), 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative isolate overflow-hidden bg-navy">
      {slides.map((s, i) => (
        <div
          key={s.src}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === active ? 1 : 0 }}
          aria-hidden={i !== active}
        >
          <Image
            src={s.src || "/placeholder.svg"}
            alt={s.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />

      {/* CHANGEMENT 1 : Réduction du padding haut (pt-12 ou pt-16 au lieu de py-24) */}
      <div className="container-ameg relative flex min-h-[88vh] flex-col justify-center pb-20 pt-12 text-white">
        <div className="max-w-2xl">
          {/* <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
            <span className="size-1.5 rounded-full bg-orange" />
            Équipements CHR — Hôtellerie & Restauration
          </span> */}

          <h1 className="text-pretty text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Équipez votre cuisine professionnelle avec les meilleures marques
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/80">
            AMEG International conçoit, fournit et installe des équipements de cuisine professionnelle
            pour les restaurants, hôtels, collectivités et boulangeries en Afrique de l&apos;Ouest.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="xl" variant="cta" render={<Link href="/catalogue" />}>
              Découvrir le catalogue <ArrowRight className="size-5" />
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white"
              render={<Link href="/etude-de-projet" />}
            >
              <PhoneCall className="size-5" /> Étude de projet gratuite
            </Button>
          </div>
        </div>

        <div className="mt-14 flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Voir l'image ${i + 1}`}
              className="h-1.5 rounded-full transition-all"
              style={{
                width: i === active ? 40 : 16,
                backgroundColor: i === active ? 'var(--color-orange)' : 'rgba(255,255,255,0.4)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}