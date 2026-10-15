"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import PolicySelector from "@/components/PolicySelector";
import { PolicySlug, getPolicy } from "@/lib/site";
import { useSearchParams } from "next/navigation";

const validSlugs: PolicySlug[] = [
  "privacy-policy",
  "terms-of-service",
  "image-data-usage",
];

type Policy = Awaited<ReturnType<typeof getPolicy>>;

export default function PoliciesPage() {
  const searchParams = useSearchParams();
  const requestedPolicy = searchParams.get("policy");

  const slug: PolicySlug = validSlugs.includes(
    requestedPolicy as PolicySlug
  )
    ? (requestedPolicy as PolicySlug)
    : "privacy-policy";

  const [policy, setPolicy] = useState<Policy | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    setPolicy(null);
    setError(false);

    getPolicy(slug)
      .then((result) => {
        if (!cancelled) setPolicy(result);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return (
    <main className="policy-page p-4">
      <PolicySelector currentPolicy={slug} />

      {error ? (
        <p>Unable to load this policy. Please try again later.</p>
      ) : !policy ? (
        <p>Loading policy...</p>
      ) : (
        <article className="policy-content">
          <header>
            <h1>{policy.title}</h1>
            <h3>Last updated: {policy.updatedAt}</h3>
          </header>

          <ReactMarkdown>{policy.content}</ReactMarkdown>
        </article>
      )}
    </main>
  );
}
