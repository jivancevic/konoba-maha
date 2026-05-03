'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type Direction = 'up' | 'left' | 'right' | 'none';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
  style?: React.CSSProperties;
}

const dirMap: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 32 },
  left: { x: -28 },
  right: { x: 28 },
  none: {},
};

export default function Reveal({ children, delay = 0, direction = 'up', className, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const initial = { opacity: 0, ...dirMap[direction] };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : initial}
      transition={{ duration: 0.85, delay: delay / 1000, ease: 'easeOut' }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
