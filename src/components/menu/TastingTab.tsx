'use client';

import type { TastingMenu } from '@/types';
import Reveal from '@/components/Reveal';

interface TastingTabProps {
  data: TastingMenu;
}

export default function TastingTab({ data }: TastingTabProps) {
  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      {/* Header */}
      <Reveal>
        <div className="text-center mb-16">
          <h2
            className="italic mb-3"
            style={{
              fontFamily: 'var(--font-playfair-display)',
              fontSize: 'clamp(2rem,4vw,3rem)',
              fontWeight: 400,
              color: '#1A1A1A',
            }}
          >
            {data.title}
          </h2>
          <p
            className="uppercase"
            style={{
              fontFamily: 'var(--font-montserrat-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              color: '#9B9390',
            }}
          >
            {data.subtitle}
          </p>
        </div>
      </Reveal>

      {/* Timeline */}
      <div className="relative mb-16" style={{ paddingLeft: '3rem' }}>
        {/* Vertical line */}
        <div
          className="absolute"
          style={{
            left: '1.1rem',
            top: 0,
            bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, transparent, rgba(155,128,96,0.4) 5%, rgba(155,128,96,0.4) 95%, transparent)',
          }}
        />

        {data.courses.map((course, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="relative flex gap-8 mb-10 items-start">
              {/* Timeline dot */}
              <div
                className="absolute rounded-full"
                style={{
                  left: '-2.3rem',
                  top: '0.35rem',
                  width: 10,
                  height: 10,
                  border: '1px solid #9B8060',
                  background: i === 5 ? '#9B8060' : '#F5F5F0',
                }}
              />
              <div className="flex-1">
                <div className="flex items-baseline gap-4 mb-1">
                  <span
                    className="font-semibold"
                    style={{
                      fontFamily: 'var(--font-montserrat-sans)',
                      fontSize: '0.55rem',
                      letterSpacing: '0.18em',
                      color: '#9B8060',
                    }}
                  >
                    {course.num}
                  </span>
                  <h4
                    style={{
                      fontFamily: 'var(--font-playfair-display)',
                      fontSize: '1.25rem',
                      fontWeight: 400,
                      color: '#1A1A1A',
                    }}
                  >
                    {course.name}
                  </h4>
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-montserrat-sans)',
                    fontSize: '0.72rem',
                    color: '#9B9390',
                    lineHeight: 1.6,
                    fontWeight: 300,
                  }}
                >
                  {course.desc}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Pricing */}
      <Reveal delay={100}>
        <div className="grid grid-cols-2 gap-4">
          {[data.price1, data.price2].map((p, i) => (
            <div
              key={i}
              className="text-center p-8"
              style={{
                border: `1px solid ${i === 1 ? '#9B8060' : 'rgba(26,26,26,0.12)'}`,
                background: i === 1 ? 'rgba(155,128,96,0.04)' : 'transparent',
              }}
            >
              <div
                className="uppercase mb-3"
                style={{
                  fontFamily: 'var(--font-montserrat-sans)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.22em',
                  color: '#9B9390',
                }}
              >
                {p.label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-playfair-display)',
                  fontSize: 'clamp(2rem,3vw,2.6rem)',
                  fontWeight: 400,
                  color: i === 1 ? '#9B8060' : '#1A1A1A',
                  marginBottom: '0.25rem',
                }}
              >
                {p.value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-montserrat-sans)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  color: '#C0BBB5',
                }}
              >
                {p.sub}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
