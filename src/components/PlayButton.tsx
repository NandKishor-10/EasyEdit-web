"use client";

import { motion, useReducedMotion, useSpring } from "motion/react";
import { GooglePlayLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { CTA_LABEL, PLAY_URL } from "@/lib/site";

type Props = {
  size?: "md" | "lg";
  tone?: "accent" | "dark";
  magnetic?: boolean;
};

const spring = { stiffness: 220, damping: 18, mass: 0.4 };

/** The one download CTA. Magnetic pull on fine pointers, a physical press on tap. */
export function PlayButton({ size = "md", tone = "accent", magnetic = false }: Props) {
  const reduce = useReducedMotion();
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  const sizing = size === "lg" ? "px-7 py-4 text-base" : "px-5 py-3 text-sm";
  const colors =
    tone === "dark"
      ? "bg-[#10100f] text-[#f1f1ed] hover:bg-[#262624]"
      : "bg-accent text-accent-fg hover:brightness-95";

  return (
    <motion.a
      href={PLAY_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{ x, y }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      onPointerMove={(e) => {
        if (!magnetic || reduce || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * 0.22);
        y.set((e.clientY - (r.top + r.height / 2)) * 0.3);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`inline-flex items-center gap-2.5 whitespace-nowrap rounded-full font-semibold transition-colors ${sizing} ${colors}`}
    >
      <GooglePlayLogoIcon aria-hidden size={size === "lg" ? 22 : 18} weight="regular" />
      {CTA_LABEL}
      <span className="sr-only"> on Google Play</span>
    </motion.a>
  );
}
