import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import { Footer, Header } from "@/components/Chrome";
import { CopyField } from "@/components/CopyField";
import { DeleteSteps } from "@/components/DeleteSteps";
import { Reveal } from "@/components/Reveal";
import { DELETE_BODY_TEMPLATE, DELETE_STEPS, DELETE_SUBJECT } from "@/lib/delete-steps";
import { SITE_NAME, SITE_URL, SUPPORT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delete Your Account",
  description: `How to delete your ${SITE_NAME} account and its data: in the app under Profile, Edit profile, Delete account, or by email from your registered address.`,
  alternates: { canonical: "/delete-account" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: `How to delete your ${SITE_NAME} account`,
  url: `${SITE_URL}/delete-account`,
  step: DELETE_STEPS.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
};

const mailto = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(DELETE_SUBJECT)}&body=${encodeURIComponent(DELETE_BODY_TEMPLATE)}`;

const REMOVED = [
  "Your account details: email address, user ID, profile name, username and profile picture",
  "Your token balance",
  "The images stored with your account: originals, edited images and AI-generated images",
];

const GOOD_TO_KNOW = [
  "Deletion is permanent and cannot be undone. Save any images you want to keep first.",
  "Tokens bought through Google Play are not refunded by deleting your account. Refund questions go through Google Play.",
  "We may keep limited information where needed for security, legal or operational reasons, as described in the Privacy Policy.",
];

export default function DeleteAccountPage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-accent-fg"
      >
        Skip to content
      </a>
      <Header />

      <main id="main" className="mx-auto max-w-350 px-5 md:px-8">
        {/* Intro */}
        <section className="pb-20 pt-12 md:pb-28 md:pt-20">
          <Reveal>
            <h1 className="max-w-5xl font-display text-[clamp(3rem,8vw,7rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
              Delete your account.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              You can delete your {SITE_NAME} account yourself inside the app. If you cannot open the
              app, ask us by email and we will do it for you.
            </p>
          </Reveal>
        </section>

        {/* Method 1: in the app */}
        <section
          id="in-app"
          aria-labelledby="in-app-title"
          className="grid gap-12 pb-24 md:pb-36 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"
        >
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <h2
                id="in-app-title"
                className="font-display text-[clamp(2.25rem,5vw,4.25rem)] font-extrabold leading-none tracking-[-0.04em]"
              >
                Do it in the app.
              </h2>
              <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted">
                It takes six taps, and you will see a confirmation when it is done.
              </p>
            </Reveal>
          </div>
          <DeleteSteps />
        </section>

        {/* Method 2: by email */}
        <section
          id="by-email"
          aria-labelledby="by-email-title"
          className="rounded-3xl border border-line bg-surface p-6 md:p-12"
        >
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <h2
                id="by-email-title"
                className="font-display text-[clamp(2.25rem,5vw,4.25rem)] font-extrabold leading-none tracking-[-0.04em]"
              >
                Cannot open the app? Email us.
              </h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
                To keep your account safe, we only act on requests from the email address you signed up
                with.
              </p>
              <ul className="mt-8 grid max-w-md gap-4 text-base leading-relaxed">
                <li className="border-t border-line pt-4">
                  Send the email <strong>from your registered email address</strong>, so we can verify it
                  is really you.
                </li>
                <li className="border-t border-line pt-4">
                  Use the exact subject shown here.
                </li>
                <li className="border-t border-line pt-4">
                  In the body, include your <strong>registered email ID</strong> and your{" "}
                  <strong>reason for deletion</strong>.
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="grid gap-2">
                <CopyField label="Send to" value={SUPPORT_EMAIL} />
                <CopyField label="Subject" value={DELETE_SUBJECT} />
                <CopyField label="Message" value={DELETE_BODY_TEMPLATE} />
                <div className="mt-2">
                  <a
                    href={mailto}
                    className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-fg transition-[filter,transform] hover:brightness-95 active:scale-[0.98]"
                  >
                    <EnvelopeSimple aria-hidden size={20} weight="regular" />
                    Email deletion request
                  </a>
                  <p className="mt-3 text-sm text-muted">
                    Opens your email app with the subject and message filled in. Remember to send it from
                    your registered address.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* What happens to your data */}
        <section
          aria-labelledby="data-title"
          className="grid gap-12 py-24 md:py-36 lg:grid-cols-2 lg:gap-20"
        >
          <Reveal className="lg:col-span-2">
            <h2
              id="data-title"
              className="font-display text-[clamp(2.25rem,5vw,4.25rem)] font-extrabold leading-none tracking-[-0.04em]"
            >
              What deletion covers.
            </h2>
          </Reveal>
          <Reveal>
            <h3 className="font-display text-2xl font-extrabold tracking-[-0.03em]">
              Removed with your account
            </h3>
            <ul className="mt-5 grid gap-3 text-base leading-relaxed text-muted">
              {REMOVED.map((item) => (
                <li key={item} className="border-t border-line pt-3">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <h3 className="font-display text-2xl font-extrabold tracking-[-0.03em]">Good to know</h3>
            <ul className="mt-5 grid gap-3 text-base leading-relaxed text-muted">
              {GOOD_TO_KNOW.map((item) => (
                <li key={item} className="border-t border-line pt-3">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <nav
          aria-label="Related pages"
          className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pb-24 pt-8"
        >
          {[
            ["/policies?policy=privacy-policy", "Read the Privacy Policy"],
            ["/contact", "Contact us"],
          ].map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="group inline-flex items-center gap-1.5 text-base font-medium transition-colors hover:text-muted"
            >
              {label}
              <ArrowUpRight
                aria-hidden
                size={18}
                weight="regular"
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          ))}
        </nav>
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
