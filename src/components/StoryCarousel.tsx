'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, animate } from 'framer-motion';

const IMAGES = [
  '/images/carousel/broccoli.webp',
  '/images/carousel/greenery.webp',
  '/images/carousel/inside.webp',
  '/images/carousel/outside.webp',
  '/images/carousel/outside02.webp',
  '/images/carousel/peka02.webp',
  '/images/carousel/peka03.webp',
  '/images/carousel/people.webp',
  '/images/carousel/people02.webp',
  '/images/carousel/soparnik.webp',
  '/images/carousel/table03.webp',
  '/images/carousel/table04.webp',
  '/images/carousel/table05.webp',
];

const N = IMAGES.length;
const EXTENDED = [...IMAGES, ...IMAGES, ...IMAGES];
const ITEM_RATIO = 0.58;
const GAP_RATIO = 0.012;

function xForIndex(index: number, cw: number) {
  const itemW = cw * ITEM_RATIO;
  const gap = cw * GAP_RATIO;
  return (cw - itemW) / 2 - index * (itemW + gap);
}

export default function StoryCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cw, setCw] = useState(0);
  const x = useMotionValue(0);
  const indexRef = useRef(N);
  const animatingRef = useRef(false);

  // Measure + set initial position synchronously before first paint so the
  // center image is always correctly centred from the very first frame.
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const reset = (w: number) => {
      setCw(w);
      indexRef.current = N;
      x.set(xForIndex(N, w));
    };

    reset(el.offsetWidth);

    const ro = new ResizeObserver(() => reset(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, [x]);

  // Auto-advance
  useEffect(() => {
    if (!cw) return;

    const interval = setInterval(() => {
      if (animatingRef.current) return;
      const next = indexRef.current + 1;
      animatingRef.current = true;

      animate(x, xForIndex(next, cw), {
        duration: 1.8,
        ease: [0.76, 0, 0.24, 1],
        onComplete: () => {
          animatingRef.current = false;
          indexRef.current = next;
          // Seamless loop: once past the second copy, silently jump back
          if (next >= N * 2) {
            const looped = next - N;
            x.set(xForIndex(looped, cw));
            indexRef.current = looped;
          }
        },
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [cw, x]);

  const itemW = cw * ITEM_RATIO;
  const gap = cw * GAP_RATIO;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden aspect-[10/7] md:aspect-[16/6]"
    >
      {cw > 0 && (
        <>
          <motion.div
            className="absolute inset-y-0 flex"
            style={{ x, left: 0 }}
          >
            {EXTENDED.map((src, i) => (
              <div
                key={i}
                className="relative flex-shrink-0 h-full"
                style={{ width: itemW, marginRight: gap }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="60vw"
                />
              </div>
            ))}
          </motion.div>

          <div
            className="absolute inset-y-0 left-0 w-[24%] pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to right, rgba(245,245,240,0.88) 0%, rgba(245,245,240,0.5) 50%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-[24%] pointer-events-none z-10"
            style={{
              background:
                "linear-gradient(to left, rgba(245,245,240,0.88) 0%, rgba(245,245,240,0.5) 50%, transparent 100%)",
            }}
          />
        </>
      )}
    </div>
  );
}
