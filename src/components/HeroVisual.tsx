"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Compare } from "@/components/Compare";
import { IMG, img } from "@/lib/site";

export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const tilt = useTransform(scrollYProgress, [0, 1], [-6, -12]);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[26rem] lg:ml-auto lg:mr-0">
      {/* Depth layer: drifts against the scroll so the phone feels like it sits in front of it. */}
      <motion.div
        aria-hidden
        style={reduce ? { rotate: -6 } : { y, rotate: tilt }}
        className="absolute -bottom-[7%] -left-[20%] -z-10 aspect-[3/4] w-[48%] overflow-hidden rounded-3xl border border-line max-sm:hidden"
      >
        <Image
          src={img(IMG.waves, 700)}
          alt=""
          fill
          sizes="200px"
          className="object-cover grayscale"
        />
      </motion.div>

      <div className="rounded-[2.5rem] border border-line bg-surface p-2.5">
        <Compare
          src={img(IMG.portrait, 1000)}
          alt="Expressive portrait shown before and after an enhance edit"
          sizes="(min-width: 1024px) 400px, 90vw"
          ratio="4 / 5"
          objectPosition="center 34%"
          beforeFilter="saturate(0.7) contrast(0.88) brightness(0.95)"
          afterFilter="saturate(1.3) contrast(1.12) brightness(1.04)"
          label="Compare original and enhanced photo"
          priority
        />
      </div>
      <p className="mt-4 text-sm text-muted">Drag to compare the original with an enhanced edit.</p>
    </div>
  );
}
