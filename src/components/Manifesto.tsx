"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

const TEXT =
  "Not here to change your vision. Here to take it further. Quick fixes when you need them, AI when you want to go beyond the obvious, one space for both.";

function Word({
  children,
  range,
  progress,
  still,
}: {
  children: string;
  range: [number, number];
  progress: MotionValue<number>;
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span style={still ? undefined : { opacity }} className="mr-[0.26em] inline-block">
      {children}
    </motion.span>
  );
}

/** Words light up as you read down the page, so scroll speed becomes reading pace. */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = TEXT.split(" ");

  return (
    <section className="mx-auto max-w-[1400px] px-5 py-28 md:px-8 md:py-44">
      <p
        ref={ref}
        className="mx-auto max-w-5xl font-display text-[clamp(2rem,5.2vw,4.6rem)] font-bold leading-[1.08] tracking-[-0.035em]"
      >
        {words.map((word, i) => {
          const start = (i / words.length) * 0.85;
          const end = start + 0.15;
          return (
            <Word key={i} range={[start, end]} progress={scrollYProgress} still={reduce}>
              {word}
            </Word>
          );
        })}
      </p>
    </section>
  );
}
