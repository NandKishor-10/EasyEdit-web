"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Crop, PencilSimpleLine, Sliders, TextAa } from "@phosphor-icons/react/dist/ssr";
import { useId, useRef, useState, type ReactNode } from "react";
import { FILTERS, IMG, img } from "@/lib/site";

const tile = "relative flex flex-col overflow-hidden rounded-3xl border border-line p-5 md:p-7";

function TileHead({
  icon,
  title,
  body,
}: {
  icon: ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="mb-5">
      <div className="mb-4 text-current">{icon}</div>
      <h3 className="font-display text-2xl font-extrabold leading-[1.1] tracking-[-0.03em] md:text-3xl">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed opacity-75 md:text-base">{body}</p>
    </div>
  );
}

/* ---------- Filters: a real, working preview ---------- */

export function FiltersTile({ className = "" }: { className?: string }) {
  const [active, setActive] = useState<(typeof FILTERS)[number]>(FILTERS[2]);
  const reduce = useReducedMotion();
  const name = useId();
  const fade = reduce ? 0 : 0.35;

  return (
    <div className={`${tile} bg-surface ${className}`}>
      <TileHead
        icon={<Sliders aria-hidden size={28} weight="regular" />}
        title="Filters that set the mood."
        body="Pop, Vivid, Mono and more. Tap one to try it on this photo."
      />
      <div className="relative min-h-[22rem] flex-1 overflow-hidden rounded-2xl bg-surface-2">
        <AnimatePresence initial={false}>
          <motion.div
            key={active.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1, transition: { duration: fade } }}
            transition={{ duration: fade }}
          >
            <Image
              src={img(IMG.portrait, 1200)}
              alt={`Portrait photo with the ${active.name} filter applied`}
              fill
              sizes="(min-width: 768px) 640px, 90vw"
              className="object-cover"
              style={{ filter: active.css, objectPosition: "center 34%" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <fieldset className="mt-5">
        <legend className="sr-only">Choose a filter</legend>
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <label key={f.id} className="cursor-pointer">
              <input
                type="radio"
                name={name}
                value={f.id}
                checked={active.id === f.id}
                onChange={() => setActive(f)}
                className="peer sr-only"
              />
              <span className="inline-flex rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-2 peer-checked:border-accent peer-checked:bg-accent peer-checked:text-accent-fg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-fg">
                {f.name}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

/* ---------- Crop ---------- */

export function CropTile({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`${tile} bg-surface ${className}`}>
      <TileHead
        icon={<Crop aria-hidden size={28} weight="regular" />}
        title="Crop to a better frame."
        body="Straighten, rotate and trim to the ratio you need."
      />
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-surface-2">
        <Image
          src={img(IMG.lake, 900)}
          alt="Landscape photo with a crop frame over it"
          fill
          sizes="(min-width: 768px) 460px, 90vw"
          className="object-cover"
        />
        <motion.div
          aria-hidden
          className="crop-grid absolute inset-0 border-2 border-accent shadow-[0_0_0_100vmax_rgb(0_0_0/0.5)]"
          initial={reduce ? { scale: 0.72 } : { scale: 1 }}
          whileInView={{ scale: 0.72 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

/* ---------- Adjust: sliders drive CSS variables directly, no re-render per tick ---------- */

const SLIDERS = [
  { id: "b", label: "Brightness", min: 60, max: 150 },
  { id: "c", label: "Contrast", min: 60, max: 150 },
  { id: "s", label: "Saturation", min: 0, max: 200 },
] as const;

export function AdjustTile({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const uid = useId();

  return (
    <div
      ref={root}
      className={`${tile} bg-surface ${className}`}
      style={{ "--b": 1, "--c": 1, "--s": 1 } as React.CSSProperties}
    >
      <TileHead
        icon={<Sliders aria-hidden size={28} weight="regular" />}
        title="Fine-tune the colors."
        body="Brightness, contrast and saturation, live on this photo."
      />
      <div className="relative mb-5 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-surface-2">
        <Image
          src={img(IMG.waves, 900)}
          alt="Ocean waves photo adjusted by the sliders below"
          fill
          sizes="(min-width: 768px) 460px, 90vw"
          className="object-cover"
          style={{ filter: "brightness(var(--b)) contrast(var(--c)) saturate(var(--s))" }}
        />
      </div>
      <div className="grid gap-3">
        {SLIDERS.map((s) => (
          <div key={s.id} className="grid grid-cols-[6.5rem_1fr] items-center gap-3">
            <label htmlFor={`${uid}-${s.id}`} className="text-sm text-muted">
              {s.label}
            </label>
            <input
              id={`${uid}-${s.id}`}
              type="range"
              min={s.min}
              max={s.max}
              defaultValue={100}
              className="h-6 w-full cursor-pointer accent-[var(--accent)]"
              onInput={(e) =>
                root.current?.style.setProperty(`--${s.id}`, String(Number(e.currentTarget.value) / 100))
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Text ---------- */

export function TextTile({ className = "" }: { className?: string }) {
  return (
    <div className={`${tile} justify-between border-transparent bg-accent text-accent-fg ${className}`}>
      <TileHead
        icon={<TextAa aria-hidden size={28} weight="regular" />}
        title="Add words that fit."
        body="Pick a font, size and color, then place text anywhere."
      />
      <p
        aria-hidden
        className="font-display text-[clamp(6rem,14vw,10rem)] font-extrabold leading-[0.85] tracking-[-0.06em]"
      >
        Aa
      </p>
    </div>
  );
}

/* ---------- Markup ---------- */

export function MarkupTile({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`${tile} tile-graphite justify-between gap-10 ${className}`}>
      <TileHead
        icon={<PencilSimpleLine aria-hidden size={28} weight="regular" />}
        title="Draw on your photo."
        body="Sketch, circle and annotate with markup pens."
      />
      <p className="font-display text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-[1.1] tracking-[-0.04em]">
        Circle{" "}
        <span className="relative inline-block pb-[0.14em]">
          what matters
          <motion.span
            aria-hidden
            className="absolute bottom-0 left-0 h-[0.1em] w-full origin-left rounded-full bg-accent"
            initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </span>
        .
      </p>
    </div>
  );
}
