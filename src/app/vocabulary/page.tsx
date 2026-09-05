import { Suspense } from "react";
import VocabularyClient from "./vocabulary-client";
import { TOTAL_VOCAB_TERMS } from "@/lib/vocabulary";

export const metadata = {
  title: "Vocabulary",
  description: `Key terms and exam definitions for VU BSCS semester-1 subjects, with flashcards and search. ${TOTAL_VOCAB_TERMS} terms and counting.`,
};

export default function VocabularyPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-10">
          <p className="text-black/50 dark:text-white/50">Loading vocabulary…</p>
        </div>
      }
    >
      <VocabularyClient />
    </Suspense>
  );
}
