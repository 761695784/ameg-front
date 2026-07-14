import { MessageCircle } from 'lucide-react'
import { getSettings } from '@/lib/api'
import { resolveSettings, whatsappLink } from '@/lib/site'

export async function WhatsAppFloatingButton() {
  const settings = resolveSettings(await getSettings())
  const href = whatsappLink(
    settings.whatsapp_number,
    "Bonjour AMEG International, je souhaite un renseignement sur vos équipements.",
  )

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Discuter sur WhatsApp"
      className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-turquoise px-4 py-3 text-sm font-semibold text-turquoise-foreground shadow-lg transition-transform hover:scale-105 md:bottom-6 md:right-6"
    >
      <MessageCircle className="size-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  )
}
