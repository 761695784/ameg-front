import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import { AdminLoginForm } from '@/components/admin/login-form'

export const metadata: Metadata = {
  title: 'Administration',
  description: "Espace d'administration AMEG International.",
  robots: { index: false, follow: false },
}

export default function AdminLoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-navy"
          >
            <ArrowLeft className="size-4" /> Retour au site
          </Link>

          <Image
            src="/images/ameg-logo.png"
            alt="AMEG International"
            width={180}
            height={54}
            className="h-11 w-auto"
          />

          <h1 className="mt-8 font-heading text-2xl font-bold text-navy">Espace administration</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Connectez-vous pour gérer le catalogue, les devis et le contenu du site.
          </p>

          <div className="mt-8">
            <AdminLoginForm />
          </div>

          <p className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-turquoise" />
            Accès sécurisé réservé au personnel autorisé.
          </p>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <Image
          src="/images/hero-catalogue.jpg"
          alt="Cuisine professionnelle AMEG"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/70" />
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <blockquote className="max-w-md">
            <p className="font-heading text-2xl font-bold text-white text-balance">
              « L&apos;excellence dans chaque équipement, la confiance dans chaque projet. »
            </p>
            <footer className="mt-4 text-white/70">AMEG International</footer>
          </blockquote>
        </div>
      </div>
    </main>
  )
}
