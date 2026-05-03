'use client';

import type { GroupMenu } from '@/types';
import Reveal from '@/components/Reveal';

interface GroupTabProps {
  data: GroupMenu;
}

export default function GroupTab({ data }: GroupTabProps) {
  return (
    <div style={{ maxWidth: 740, margin: '0 auto' }}>
      {/* Header */}
      <Reveal>
        <div className="text-center mb-14">
          <div
            className="inline-block uppercase mb-6"
            style={{
              background: '#1A1A1A',
              color: '#F5F5F0',
              fontFamily: 'var(--font-montserrat-sans)',
              fontSize: '0.55rem',
              letterSpacing: '0.25em',
              padding: '8px 20px',
            }}
          >
            {data.badge}
          </div>
          <h2
            className="mb-3"
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
            style={{
              fontFamily: 'var(--font-montserrat-sans)',
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              color: '#9B9390',
            }}
          >
            {data.style}
          </p>
        </div>
      </Reveal>

      {/* Courses */}
      <div className="mb-14">
        {data.courses.map((course, i) => (
          <Reveal key={i} delay={i * 70}>
            <div
              className="py-6"
              style={{
                display: 'grid',
                gridTemplateColumns: '7rem 1fr',
                gap: '1.5rem',
                borderBottom: i < data.courses.length - 1 ? '1px solid rgba(26,26,26,0.07)' : 'none',
                alignItems: 'start',
              }}
            >
              <div>
                <div
                  className="uppercase font-semibold"
                  style={{
                    fontFamily: 'var(--font-montserrat-sans)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.2em',
                    color: '#9B8060',
                  }}
                >
                  Course {String(i + 1).padStart(2, '0')}
                </div>
                <div
                  className="mt-1"
                  style={{
                    fontFamily: 'var(--font-montserrat-sans)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.08em',
                    color: '#C0BBB5',
                  }}
                >
                  {course.type}
                </div>
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-playfair-display)',
                  fontSize: '1.05rem',
                  color: '#1A1A1A',
                  lineHeight: 1.5,
                }}
              >
                {course.name}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Pricing */}
      <Reveal delay={100}>
        <div className="grid grid-cols-2 gap-4 mb-10">
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

      {/* Disclaimer */}
      <Reveal delay={150}>
        <div
          className="p-6 px-8"
          style={{ background: '#EFEFEA', border: '1px solid rgba(26,26,26,0.08)' }}
        >
          <div className="flex gap-4 items-start">
            <span className="flex-shrink-0 mt-[2px]" style={{ color: '#9B8060' }}>✦</span>
            <p
              style={{
                fontFamily: 'var(--font-montserrat-sans)',
                fontSize: '0.72rem',
                lineHeight: 1.8,
                color: '#6B6560',
                fontWeight: 300,
                letterSpacing: '0.02em',
              }}
            >
              {data.note}
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
