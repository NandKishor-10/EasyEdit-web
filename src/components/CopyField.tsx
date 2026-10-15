"use client";

import { Check, Copy } from "@phosphor-icons/react/dist/ssr";
import { useRef, useState } from "react";

/** A labelled value with a copy button, for visitors who have no mail app set up. */
export function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div>
      <p className="mb-2 text-sm font-semibold">{label}</p>
      <div className="flex items-start gap-3 rounded-2xl border border-line bg-bg p-4">
        <p className="min-w-0 flex-1 whitespace-pre-line break-words text-base leading-relaxed">{value}</p>
        <button
          type="button"
          onClick={copy}
          aria-label={`Copy ${label.toLowerCase()}`}
          className="grid size-10 shrink-0 place-items-center rounded-full border border-line text-muted transition-colors hover:bg-surface-2 hover:text-fg active:scale-95"
        >
          {copied ? <Check aria-hidden size={18} weight="bold" /> : <Copy aria-hidden size={18} weight="regular" />}
        </button>
      </div>
      <p role="status" aria-live="polite" className="mt-1.5 h-5 text-sm text-muted">
        {copied ? "Copied" : ""}
      </p>
    </div>
  );
}
