"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { PlayButton } from "@/components/PlayButton";

export function DownloadBlock() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-18, -6]);

  return (
    <section
      id="download"
      ref={ref}
      className="relative isolate overflow-hidden bg-accent px-5 py-28 text-center text-accent-fg md:py-40"
    >
      {/* Big icon (public/icon.png) as the background: drifts and turns as the section crosses the screen. */}
      <motion.div
        aria-hidden
        style={reduce ? { rotate: -12 } : { y, rotate }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 w-[min(85vw,52rem)] -translate-x-1/2 -translate-y-1/2 select-none opacity-[0.16] mix-blend-multiply"
      >
        <Image
          src="./icon.png"
          alt=""
          width={1024}
          height={1024}
          sizes="(min-width: 832px) 832px, 85vw"
          className="h-auto w-full"
          draggable={false}
        />
      </motion.div>

      <h2 className="mx-auto max-w-4xl font-display text-[clamp(3rem,9vw,8rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
        Your photo.
        <br />
        Your rules.
      </h2>
      <p className="mx-auto mt-6 max-w-sm text-lg opacity-80">
        Make the edit you imagined. Then make one you didn&rsquo;t.
      </p>
      <div className="mt-10 flex justify-center">
        <PlayButton size="lg" tone="dark" magnetic />
      </div>
    </section>
  );
}
