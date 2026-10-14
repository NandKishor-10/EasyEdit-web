import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { Footer, Header } from "@/components/Chrome";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { SITE_NAME, SITE_URL, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get help with ${SITE_NAME}, report a bug, suggest a feature or ask about your account and data. We reply by email.`,
  alternates: { canonical: "/contact" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${SITE_NAME}`,
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SUPPORT_EMAIL,
      availableLanguage: "English",
    },
  },
};

const LINKS = [
  { href: "/delete-account", label: "Delete your account" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

export default function ContactPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-accent-fg"
      >
        Skip to content
      </a>
      <Header />

      <main
        id="main"
        className="mx-auto grid max-w-[1400px] gap-14 px-5 pb-28 pt-12 md:px-8 md:pt-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
      >
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <h1 className="font-display text-[clamp(3rem,7.5vw,6.5rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
              Talk to a human.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Stuck on an edit, found a bug or have an idea? Send a message and we will reply by
              email.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="group mt-10 flex w-fit max-w-full items-center gap-4 rounded-3xl border border-line bg-surface p-5 transition-colors hover:bg-surface-2"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-accent-fg">
                <EnvelopeSimple aria-hidden size={24} weight="regular" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm text-muted">Email support</span>
                <span className="block break-words text-lg font-semibold">{SUPPORT_EMAIL}</span>
              </span>
            </a>

            <ul className="mt-8 grid max-w-sm gap-1">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center justify-between rounded-full px-1 py-2.5 text-base text-muted transition-colors hover:text-fg"
                  >
                    {l.label}
                    <ArrowUpRight
                      aria-hidden
                      size={18}
                      weight="regular"
                      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <div className="rounded-3xl border border-line bg-surface p-6 md:p-10">
            <h2 className="mb-8 font-display text-3xl font-extrabold tracking-[-0.03em]">
              Send a message
            </h2>
            <ContactForm />
          </div>
        </Reveal>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
