'use client'

const CONTENT =
  'ARCHITECTURE · INTERIORS · SITE EXECUTION · NAIROBI · KENYA · RESIDENTIAL · COMMERCIAL · SUSTAINABLE DESIGN · '

export function Marquee() {
  const repeated = CONTENT.repeat(4)

  return (
    <div className="w-full h-12 bg-gold overflow-hidden flex items-center group">
      <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
        {[0, 1].map((_, i) => (
          <span
            key={i}
            className="inline-block font-body font-medium text-ink text-xs tracking-[0.2em] uppercase px-0"
            aria-hidden={i === 1}
          >
            {repeated}
          </span>
        ))}
      </div>
    </div>
  )
}
