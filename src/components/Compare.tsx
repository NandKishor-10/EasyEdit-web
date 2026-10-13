"use client";

import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
} from "motion/react";
import { ArrowsLeftRight } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useRef } from "react";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  beforeFilter: string;
  afterFilter: string;
  ratio: string;
  label: string;
  priority?: boolean;
  objectPosition?: string;
};

/**
 * Real before/after preview. Drag, tap, or use the arrow keys on the handle.
 * An intro sweep plays once when it scrolls into view and stops the moment the user touches it.
 */
export function Compare({
  src,
  alt,
  sizes,
  beforeFilter,
  afterFilter,
  ratio,
  label,
  priority,
  objectPosition = "center",
}: Props) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const intro = useRef<AnimationPlaybackControls | null>(null);
  const dragging = useRef(false);
  const inView = useInView(box, { once: true, amount: 0.6 });

  const pos = useMotionValue(50);
  const clip = useTransform(pos, (p) => `inset(0 ${100 - p}% 0 0)`);
  const left = useTransform(pos, (p) => `${p}%`);

  useMotionValueEvent(pos, "change", (v) => {
    if (input.current) input.current.value = String(Math.round(v));
  });

  useEffect(() => {
    if (reduce || !inView) return;
    intro.current = animate(pos, [50, 80, 22, 50], {
      duration: 2.8,
      delay: 0.6,
      ease: "easeInOut",
    });
    return () => intro.current?.stop();
  }, [reduce, inView, pos]);

  const setFromX = (clientX: number) => {
    const el = box.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    pos.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={box}
      style={{ aspectRatio: ratio }}
      className="relative isolate w-full cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-3xl bg-surface-2"
      onPointerDown={(e) => {
        intro.current?.stop();
        dragging.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        setFromX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (dragging.current) setFromX(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        draggable={false}
        className="object-cover"
        style={{ filter: beforeFilter, objectPosition }}
      />
      <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
        <Image
          src={src}
          alt=""
          aria-hidden
          fill
          sizes={sizes}
          draggable={false}
          className="object-cover"
          style={{ filter: afterFilter, objectPosition }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none absolute inset-y-0 w-px bg-white/80"
        style={{ left }}
      >
        <input
          ref={input}
          type="range"
          min={0}
          max={100}
          step={1}
          defaultValue={50}
          aria-label={label}
          className="peer sr-only"
          onFocus={() => intro.current?.stop()}
          onChange={(e) => {
            intro.current?.stop();
            pos.set(Number(e.target.value));
          }}
        />
        <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-accent-fg shadow-[0_6px_24px_rgb(0_0_0/0.35)] peer-focus-visible:ring-4 peer-focus-visible:ring-white">
          <ArrowsLeftRight aria-hidden size={20} weight="regular" />
        </span>
      </motion.div>
    </div>
  );
}
