import type React from 'react'
import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Manrope } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { WhatsAppFloatingButton } from '@/components/layout/whatsapp-floating-button'
import { SiteChrome } from '@/components/layout/site-chrome'
import { QuoteCartProvider } from '@/components/quote/quote-cart-provider'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ameginternational.com'),
  title: {
    default: 'AMEG International — Équipements de cuisine professionnelle',
    template: '%s | AMEG International',
  },
  description:
    "AMEG International équipe hôtels, restaurants, boulangeries et collectivités en Afrique de l'Ouest. Grandes marques, expertise technique, installation et SAV. Demandez votre devis.",
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'AMEG International',
    title: 'AMEG International — Équipements de cuisine professionnelle',
    description:
      "Fournisseur de référence en équipements de cuisine professionnelle pour l'hôtellerie et la restauration en Afrique de l'Ouest.",
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AMEG International',
    description: 'Équipements de cuisine professionnelle pour les professionnels.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#0f2d52',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${manrope.variable} bg-background`}>
      <body>
        <QuoteCartProvider>
          <SiteChrome
            header={<Header />}
            footer={<Footer />}
            floating={<WhatsAppFloatingButton />}
          >
            {children}
          </SiteChrome>
        </QuoteCartProvider>
        <Toaster position="top-center" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
