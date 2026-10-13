"use client";

import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowsOut, Eraser, MagicWand, Sparkle } from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { Compare } from "@/components/Compare";
import { IMG, img } from "@/lib/site";

/* ---------- Demos: small live previews, each plays once when it scrolls into view ---------- */

const PROMPT = "Make the sky golden hour";

function PromptDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const seen = useInView(ref, { once: true, amount: 0.5 });
  const on = seen || !!reduce;

  return (
    <div ref={ref} className="flex h-full flex-col gap-3">
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-3xl bg-surface-2">
        <Image
          src={img(IMG.lake, 1200)}
          alt="Lakeside landscape being edited with a text prompt"
          fill
          sizes="(min-width: 768px) 560px, 90vw"
          className="object-cover"
        />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: on ? 1 : 0 }}
          transition={{ delay: reduce ? 0 : 2.2, duration: reduce ? 0 : 1.2 }}
        >
          <Image
            src={img(IMG.lake, 1200)}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 768px) 560px, 90vw"
            className="object-cover"
            style={{ filter: "sepia(0.55) saturate(1.7) hue-rotate(-14deg) brightness(1.05)" }}
          />
        </motion.div>
        {/* The brushed mask: appears, holds while the prompt types, then lets go. */}
        <motion.div
          aria-hidden
          className="absolute inset-x-[8%] top-[5%] h-[42%] rounded-[50%] border-2 border-dashed border-accent bg-accent/20"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={on && !reduce ? { opacity: [0, 1, 1, 0], scale: [0.85, 1, 1, 1] } : undefined}
          transition={{ duration: 3.6, times: [0, 0.1, 0.9, 1], delay: 0.2 }}
        />
      </div>
      <div className="flex items-center gap-3 rounded-full border border-line bg-surface px-4 py-3 font-mono text-sm">
        <MagicWand aria-hidden size={18} weight="regular" className="shrink-0" />
        <span
          className="typed"
          data-play={on}
          style={{ "--n": PROMPT.length } as CSSProperties}
        >
          {PROMPT}
        </span>
      </div>
    </div>
  );
}

function CutoutDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const seen = useInView(ref, { once: true, amount: 0.5 });
  const on = seen || !!reduce;
  const sizes = "(min-width: 768px) 560px, 90vw";

  return (
    <div ref={ref} className="checker relative h-full overflow-hidden rounded-3xl">
      {/* Subject only: the soft elliptical mask stands in for the cutout edge. */}
      <Image
        src={img(IMG.portrait, 1000)}
        alt="Portrait with the background removed"
        fill
        sizes={sizes}
        className="object-cover"
        style={{
          objectPosition: "center 34%",
          maskImage: "radial-gradient(ellipse 36% 58% at 50% 52%, #000 64%, transparent 74%)",
          WebkitMaskImage: "radial-gradient(ellipse 36% 58% at 50% 52%, #000 64%, transparent 74%)",
        }}
      />
      {/* Full photo on top fades away to reveal the transparent canvas. */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: on ? 0 : 1 }}
        transition={{ delay: reduce ? 0 : 0.7, duration: reduce ? 0 : 1.4, ease: "easeInOut" }}
      >
        <Image
          src={img(IMG.portrait, 1000)}
          alt=""
          aria-hidden
          fill
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition: "center 34%" }}
        />
      </motion.div>
    </div>
  );
}

function ExpandDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const seen = useInView(ref, { once: true, amount: 0.5 });
  const on = seen || !!reduce;
  const timing = { delay: reduce ? 0 : 0.6, duration: reduce ? 0 : 1.6, ease: [0.65, 0, 0.35, 1] as const };

  return (
    <div ref={ref} className="relative h-full overflow-hidden rounded-3xl bg-surface-2">
      {/* The photo starts zoomed in (the original frame) and settles out, revealing new canvas. */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.45 }}
        animate={{ scale: on ? 1 : 1.45 }}
        transition={timing}
      >
        <Image
          src={img(IMG.cabin, 1200)}
          alt="Lake cabin photo being expanded beyond its original frame"
          fill
          sizes="(min-width: 768px) 560px, 90vw"
          className="object-cover"
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="absolute inset-0 rounded-2xl border-2 border-dashed border-accent"
        initial={{ scale: 1 }}
        animate={{ scale: on ? 1 / 1.45 : 1 }}
        transition={timing}
      />
    </div>
  );
}

function EnhanceDemo() {
  return (
    <Compare
      src={img(IMG.lake, 1200)}
      alt="Lakeside photo before and after quality enhance"
      sizes="(min-width: 768px) 560px, 90vw"
      ratio="4 / 3"
      beforeFilter="blur(2.6px) saturate(0.75) contrast(0.88)"
      afterFilter="saturate(1.15) contrast(1.08)"
      label="Compare soft and enhanced photo"
    />
  );
}

/* ---------- Stack ---------- */

type Feature = {
  id: string;
  icon: Icon;
  name: string;
  title: string;
  body: string;
  demo: ReactNode;
};

const FEATURES: Feature[] = [
  {
    id: "prompt",
    icon: MagicWand,
    name: "Prompt editing",
    title: "Edit with a sentence.",
    body: "Brush over any area, type what you want there, and only that part changes.",
    demo: <PromptDemo />,
  },
  {
    id: "cutout",
    icon: Eraser,
    name: "Background removal",
    title: "Lose the background.",
    body: "One tap lifts your subject clean. Keep it transparent or drop it into a new scene.",
    demo: <CutoutDemo />,
  },
  {
    id: "expand",
    icon: ArrowsOut,
    name: "Image expand",
    title: "Make the frame bigger.",
    body: "Extend a photo past its edges and let AI fill the new space to match.",
    demo: <ExpandDemo />,
  },
  {
    id: "enhance",
    icon: Sparkle,
    name: "Quality enhance",
    title: "Bring back the detail.",
    body: "Sharpen soft shots and recover texture in small, old or blurry photos.",
    demo: <EnhanceDemo />,
  },
];

function StackCard({
  feature,
  index,
  total,
  progress,
}: {
  feature: Feature;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each card shrinks slightly as the next one arrives, so the pile reads as depth.
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.045]);
  const Icon = feature.icon;

  return (
    <div
      className="stack-item sticky top-0 flex min-h-dvh items-center px-4 py-6 md:px-8"
      style={{ zIndex: index + 1 }}
    >
      <motion.article
        style={{ scale }}
        className="stack-card mx-auto grid w-full max-w-[1400px] origin-top gap-6 rounded-3xl border border-line bg-surface p-5 md:grid-cols-[0.8fr_1.2fr] md:gap-12 md:p-8"
      >
        <div className="flex flex-col justify-between gap-8 md:py-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-line px-3.5 py-2 text-sm text-muted">
            <Icon aria-hidden size={18} weight="regular" />
            {feature.name}
          </div>
          <div>
            <h3 className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] md:text-6xl">
              {feature.title}
            </h3>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-muted md:text-lg">
              {feature.body}
            </p>
          </div>
        </div>
        <div className="aspect-[4/3] min-h-0 w-full md:aspect-auto md:h-[min(62dvh,34rem)]">
          {feature.demo}
        </div>
      </motion.article>
    </div>
  );
}

export function FeatureStack() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="relative">
      {FEATURES.map((feature, i) => (
        <StackCard
          key={feature.id}
          feature={feature}
          index={i}
          total={FEATURES.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}
