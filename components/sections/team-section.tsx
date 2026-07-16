import { User } from 'lucide-react'
import Image from 'next/image'
import { Reveal } from '@/components/ui/reveal'
import { SectionHeading } from './section-heading'
import { cn } from '@/lib/utils'

export interface TeamMember {
  name: string
  role: string
  description?: string
  photo?: string | null
}

export function TeamSection({
  eyebrow = 'Notre équipe',
  title = "Des experts à votre service",
  description = "Une équipe pluridisciplinaire qui connaît les contraintes du terrain et vous accompagne à chaque étape.",
  members,
  className,
}:
 {
  eyebrow?: string
  title?: string
  description?: string
  members: TeamMember[]
  className?: string
}) {
  return (
    <section className={cn('bg-background py-16 md:py-24', className)}>
      <div className="container-ameg">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} className="mb-12" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {members.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.05}>
              <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-4/5 overflow-hidden bg-secondary">
                  {member.photo ? (
                    <Image src={member.photo} alt={member.name} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <div className="flex size-full items-center justify-center text-muted-foreground">
                      <User className="size-14" />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-heading text-base font-bold text-navy">{member.name}</h3>
                  <p className="text-sm font-medium text-turquoise">{member.role}</p>
                  {member.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{member.description}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
