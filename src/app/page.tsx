import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { Footer, Header } from "@/components/Chrome";
import { DownloadBlock } from "@/components/DownloadBlock";
import { Faq } from "@/components/Faq";
import { FeatureStack } from "@/components/FeatureStack";
import { HeroHeadline } from "@/components/HeroHeadline";
import { HeroVisual } from "@/components/HeroVisual";
import { Manifesto } from "@/components/Manifesto";
import { PlayButton } from "@/components/PlayButton";
import { Reveal } from "@/components/Reveal";
import { StyleMarquee } from "@/components/StyleMarquee";
import {
  AdjustTile,
  CropTile,
  FiltersTile,
  MarkupTile,
  TextTile,
} from "@/components/ToolTiles";
import { FAQS, PLAY_URL, SITE_NAME, SITE_URL } from "@/lib/site";

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/icon.png`,
    description:
      "AI photo editor for Android with prompt editing, background removal, image expand, quality enhance, AI styles, filters, crop, text and markup.",
    applicationCategory: "PhotographyApplication",
    operatingSystem: "ANDROID",
    downloadUrl: PLAY_URL,
    installUrl: PLAY_URL,
    featureList: [
      "Edit parts of a photo with a text prompt",
      "Remove backgrounds",
      "Expand images",
      "Enhance photo quality",
      "AI style filters",
      "Crop, adjust colors and filters",
      "Add text and markup",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-accent-fg"
      >
        Skip to content
      </a>
      <Header />

      <main id="main">
        {/* Hero: asymmetric split, fits the first viewport */}
        <section className="mx-auto grid min-h-[calc(100dvh-4.5rem)] max-w-350 items-center gap-14 px-5 pb-20 pt-10 md:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:pt-16">
          <div>
            <HeroHeadline />
            <p className="mt-7 max-w-md text-lg leading-relaxed text-muted">
              Edit photos with AI, remove backgrounds, expand frames and fix every detail, all in
              one Android app.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <PlayButton size="lg" magnetic />
              <Link
                href="#ai"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-line px-6 py-4 text-base font-semibold transition-colors hover:bg-surface-2"
              >
                See what it does
                <ArrowRight aria-hidden size={18} weight="regular" />
              </Link>
            </div>
          </div>
          <HeroVisual />
        </section>

        {/* Manifesto: scroll-lit statement */}
        <Manifesto />

        {/* AI tools: sticky stack */}
        <section id="ai" className="pt-12 md:pt-20">
          <div className="mx-auto max-w-350 px-5 pb-12 md:px-8 md:pb-20">
            <Reveal>
              <h2 className="font-display text-[clamp(3.25rem,9vw,8rem)] font-extrabold leading-[0.95] tracking-[-0.045em]">
                Push the picture.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Some edits take a steady hand. Others just need a better idea. Explore the
                AI-powered side of EasyEdit.
              </p>
            </Reveal>
          </div>
          <FeatureStack />
        </section>

        {/* AI styles: the one marquee */}
        <section aria-labelledby="styles-title" className="py-24 md:py-36">
          <div className="mx-auto mb-12 max-w-350 px-5 md:px-8">
            <Reveal>
              <h2
                id="styles-title"
                className="font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-none tracking-[-0.04em]"
              >
                Every trend, one tap.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                Turn any photo into an anime film frame, a 3D animated character, comic ink and
                more.
              </p>
            </Reveal>
          </div>
          <div className="px-5 md:px-8">
            <StyleMarquee />
          </div>
        </section>

        {/* Everyday tools: bento with live previews */}
        <section id="essentials" className="mx-auto max-w-350 px-5 pb-28 md:px-8 md:pb-40">
          <Reveal>
            <h2 className="font-display text-[clamp(2.75rem,7vw,6rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
              Good edits don&rsquo;t need to be complicated.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              A little contrast. A better crop. The right filter. For every moment that only needs a
              finishing touch.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-12">
            <FiltersTile className="md:col-span-7 md:row-span-2" />
            <CropTile className="md:col-span-5" />
            <AdjustTile className="md:col-span-5" />
            <TextTile className="md:col-span-5" />
            <MarkupTile className="md:col-span-7" />
          </div>
        </section>

        {/* FAQ: crawlable answers, mirrored in FAQPage JSON-LD */}
        <section
          id="faq"
          className="mx-auto grid max-w-350 gap-12 px-5 pb-28 md:px-8 md:pb-40 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-none tracking-[-0.04em]">
              Questions, answered.
            </h2>
          </div>
          <Faq />
        </section>

        <DownloadBlock />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
