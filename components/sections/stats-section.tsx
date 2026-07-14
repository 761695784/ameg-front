'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface Stat {
  value: number
  suffix?: string
  label: string
}

function Counter({ value, suffix, active }: { value: number; suffix?: string; active: boolean }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!active) return
    const duration = 1400
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, value])

  return (
    <span>
      {display}
      {suffix}
    </span>
  )
}

export function StatsSection({
  stats,
  variant = 'navy',
  className,
}: {
  stats: Stat[]
  variant?: 'navy' | 'light'
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const isNavy = variant === 'navy'

  return (
    <section className={cn(isNavy ? 'bg-navy' : 'bg-card', className)}>
      <div ref={ref} className="container-ameg py-14 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className={cn(
                  'font-heading text-4xl font-extrabold md:text-5xl',
                  isNavy ? 'text-white' : 'text-navy',
                )}
              >
                <Counter value={stat.value} suffix={stat.suffix} active={inView} />
              </div>
              <p className={cn('mt-2 text-sm font-medium', isNavy ? 'text-white/70' : 'text-muted-foreground')}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
