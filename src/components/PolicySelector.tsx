"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const policies = [
  { slug: "privacy-policy", title: "Privacy Policy" },
  { slug: "terms-of-service", title: "Terms of Service" },
  { slug: "image-data-usage", title: "Image & Data Usage Policy" },
] as const;

export default function PolicySelector({
  currentPolicy,
}: {
  currentPolicy: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const selected =
    policies.find((policy) => policy.slug === currentPolicy) ?? policies[0];

  const handleSelect = (slug: string) => {
    setIsOpen(false);
    router.push(`/policies?policy=${slug}`);
  };
  
  return (
    <div className="relative m-4 w-64 rounded-2xl">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex w-full items-center justify-between rounded-2xl border border-[#dcdcd7] bg-[#101010] px-4 py-3 text-white transition-colors duration-200 hover:bg-[#303030]"
      >
        <span>{selected.title}</span>
        <svg
          className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute z-10 mt-2 w-full rounded-2xl bg-white/10 border border-[#dcdcd7] shadow-lg"
        >
          {policies.map((policy) => (
            <button
              key={policy.slug}
              type="button"
              role="option"
              aria-selected={selected.slug === policy.slug}
              onClick={() => handleSelect(policy.slug)}
              className={`block w-full px-4 py-3 text-left rounded-2xl transition-colors hover:bg-white/30 ${selected.slug === policy.slug ? "font-semibold bg-accent text-black" : "text-white"
                }`}
            >
              {policy.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}