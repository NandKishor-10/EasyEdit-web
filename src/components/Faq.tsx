import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { FAQS } from "@/lib/site";

/** Native details/summary: keyboard and screen reader friendly, and crawlable as plain text. */
export function Faq() {
  return (
    <div className="divide-y divide-line border-y border-line">
      {FAQS.map((item, i) => (
        <details key={item.q} className="group py-1" name="faq" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold tracking-[-0.01em] md:text-xl [&::-webkit-details-marker]:hidden">
            {item.q}
            <CaretDown
              aria-hidden
              size={22}
              weight="regular"
              className="shrink-0 text-muted transition-transform duration-300 group-open:rotate-180"
            />
          </summary>
          <p className="max-w-2xl pb-6 text-base leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
