
import { Suspense } from "react";
import PoliciesContent from "./PoliciesContent";

export default function PoliciesPage() {
  return (
    <Suspense fallback={<main className="policy-page p-4">Loading policy...</main>}>
      <PoliciesContent />
    </Suspense>
  );
}
