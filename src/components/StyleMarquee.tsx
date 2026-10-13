"use client";

import { Pause, Play, Sparkle } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";
import { STYLE_NAMES } from "@/lib/site";

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className={`flex shrink-0 items-center gap-8 pr-8 ${hidden ? "marquee-dup" : ""}`}
    >
      {STYLE_NAMES.map((name) => (
        <li key={name} className="flex items-center gap-8">
          <span className="whitespace-nowrap font-display text-[clamp(2.75rem,8vw,7rem)] font-extrabold leading-none tracking-[-0.04em]">
            {name}
          </span>
          <Sparkle aria-hidden size={36} weight="fill" className="shrink-0 text-accent" />
        </li>
      ))}
    </ul>
  );
}

/** The only marquee on the page. Pauses on hover and has an explicit pause control. */
export function StyleMarquee() {
  const [paused, setPaused] = useState(false);

  return (
    <div>
      <div
        className="marquee-wrap overflow-hidden py-4"
        data-paused={paused}
        role="region"
        aria-label="AI styles"
      >
        <div className="marquee-track">
          <Row />
          <Row hidden />
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg motion-reduce:hidden"
      >
        {paused ? <Play aria-hidden size={16} weight="fill" /> : <Pause aria-hidden size={16} weight="fill" />}
        {paused ? "Play styles" : "Pause styles"}
      </button>
    </div>
  );
}
