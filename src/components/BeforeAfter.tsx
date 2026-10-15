
"use client";

import { useState } from "react";
import { ArrowsLeftRight, Sparkle } from "@phosphor-icons/react";

const beforeImage =
  "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1400&q=90";

const afterImage =
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=90";

export function BeforeAfter() {
  const [position, setPosition] = useState(52);

  return (
    <div className="comparison">
      <div className="comparison-image comparison-after">
        <img src={afterImage} alt="Edited landscape with a dramatic composition" />
        <span className="comparison-label after-label">AFTER</span>
      </div>

      <div
        className="comparison-before"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <img src={beforeImage} alt="Original landscape before editing" />
        <span className="comparison-label">BEFORE</span>
      </div>

      <input
        aria-label="Compare original and edited images"
        className="comparison-range"
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
      />

      <div
        className="comparison-divider"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      >
        <span className="comparison-handle">
          <ArrowsLeftRight size={18} weight="regular" />
        </span>
      </div>

      <div className="comparison-caption">
        <span><Sparkle size={15} /> A DIFFERENT POINT OF VIEW</span>
        <span>{String(Math.round(position)).padStart(2, "0")} / 100</span>
      </div>
    </div>
  );
}
