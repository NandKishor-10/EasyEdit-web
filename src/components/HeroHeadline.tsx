"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

function Word({
  children,
  index,
  underline,
}: {
  children: string;
  index: number;
  underline?: boolean;
}) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-block overflow-hidden pb-[0.16em] align-bottom">
      <motion.span
        className="inline-block"
        initial={reduce ? false : { y: "115%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay: 0.12 + index * 0.1, ease }}
      >
        {children}
      </motion.span>
      {underline && (
        <motion.span
          aria-hidden
          className="absolute bottom-[0.03em] left-0 h-[0.09em] w-full origin-left rounded-full bg-accent"
          initial={reduce ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.95, ease }}
        />
      )}
    </span>
  );
}

/** Words rise out of a mask in sequence, then the last word is underlined. */
export function HeroHeadline() {
  return (
    <h1 className="font-display text-[clamp(2.75rem,8.4vw,7.25rem)] font-extrabold leading-none tracking-[-0.045em]">
      <Word index={0}>Make</Word> <Word index={1}>something</Word>
      <br />
      <Word index={2} underline>
        unordinary.
      </Word>
    </h1>
  );
}
