import ReactMarkdown from "react-markdown";
import { getPolicy, type PolicySlug } from "@/lib/site";
import PolicySelector from "@/components/PolicySelector";

const validSlugs: PolicySlug[] = [
  "privacy-policy",
  "terms-of-service",
  "image-data-usage",
];

export default async function PoliciesPage({
  searchParams,
}: {
  searchParams: Promise<{ policy?: string }>;
}) {
  const params = await searchParams;

  const slug = validSlugs.includes(params.policy as PolicySlug)
    ? (params.policy as PolicySlug)
    : "privacy-policy";

  const policy = await getPolicy(slug);

  return (
    <main className="policy-page p-4">
      <PolicySelector currentPolicy={slug} />

      <article className="policy-content">
        <header>
          <h1>{policy.title}</h1>
          <h3> Last updated: {policy.updatedAt}</h3>
        </header>
        <ReactMarkdown>{policy.content}</ReactMarkdown>
      </article>
    </main>
  );
}   