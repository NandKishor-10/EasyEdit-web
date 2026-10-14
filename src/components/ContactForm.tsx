"use client";

import { useRef, useState, type FormEvent } from "react";
import { PaperPlaneTilt } from "@phosphor-icons/react/dist/ssr";
import { SUPPORT_EMAIL } from "@/lib/site";

const TOPICS = [
  "Help with the app",
  "Report a bug",
  "Suggest a feature",
  "Account and data",
  "Business or press",
] as const;

type Errors = Partial<Record<"name" | "email" | "message", string>>;

const field =
  "w-full rounded-2xl border border-line bg-bg px-4 py-3.5 text-base text-fg placeholder:text-muted/80 transition-colors hover:border-muted focus-visible:border-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg aria-[invalid=true]:border-[#ff7a6b]";

const errorText = "mt-2 text-sm text-[#ff9a8e] [@media(prefers-color-scheme:light)]:text-[#b3261e]";

/**
 * No backend needed: validates, then opens the visitor's mail app with the message filled in.
 * Swap `onSubmit` for a Route Handler call when you add an email provider.
 */
export function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const topic = String(data.get("topic") ?? TOPICS[0]);
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Enter your name so we know who to reply to.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email, like name@example.com.";
    if (message.length < 10) next.message = "Tell us a little more, at least 10 characters.";

    setErrors(next);
    setSent(false);

    const first = (["name", "email", "message"] as const).find((k) => next[k]);
    if (first) {
      form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    const subject = `[EasyEdit] ${topic}`;
    const body = `${message}\n\nFrom: ${name} <${email}>`;
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="grid gap-6">
      <div>
        <label htmlFor="c-name" className="mb-2 block text-sm font-semibold">
          Name
        </label>
        <input
          id="c-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Aarav Mehta…"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "c-name-err" : undefined}
          className={field}
        />
        {errors.name && (
          <p id="c-name-err" className={errorText}>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="c-email" className="mb-2 block text-sm font-semibold">
          Email
        </label>
        <input
          id="c-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          spellCheck={false}
          placeholder="you@example.com…"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "c-email-err" : undefined}
          className={field}
        />
        {errors.email && (
          <p id="c-email-err" className={errorText}>
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="c-topic" className="mb-2 block text-sm font-semibold">
          What is this about?
        </label>
        <select
          id="c-topic"
          name="topic"
          autoComplete="off"
          defaultValue={TOPICS[0]}
          style={{ backgroundColor: "var(--bg)", color: "var(--fg)" }}
          className={field}
        >
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="c-message" className="mb-2 block text-sm font-semibold">
          Message
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={6}
          autoComplete="off"
          placeholder="Tell us what happened, and which phone you use…"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "c-message-err" : undefined}
          className={`${field} resize-y`}
        />
        {errors.message && (
          <p id="c-message-err" className={errorText}>
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-fg transition-[filter,transform] hover:brightness-95 active:scale-[0.98]"
        >
          <PaperPlaneTilt aria-hidden size={20} weight="regular" />
          Send message
        </button>
        <p role="status" aria-live="polite" className="text-sm text-muted">
          {sent && (
            <>
              Opening your email app&hellip; Nothing happened? Write to{" "}
              <a className="font-semibold text-fg underline underline-offset-4" href={`mailto:${SUPPORT_EMAIL}`}>
                {SUPPORT_EMAIL}
              </a>
              .
            </>
          )}
        </p>
      </div>
    </form>
  );
}
