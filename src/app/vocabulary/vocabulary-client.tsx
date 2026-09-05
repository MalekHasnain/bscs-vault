"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { VOCABULARY, VOCAB_BY_CODE, type VocabSubject } from "@/lib/vocabulary";

type Card = { code: string; term: string; definition: string };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildPool(code: string): Card[] {
  if (code && VOCAB_BY_CODE[code]) {
    return VOCAB_BY_CODE[code].terms.map((t) => ({ code, ...t }));
  }
  return VOCABULARY.flatMap((s) => s.terms.map((t) => ({ code: s.code, ...t })));
}

export default function VocabularyClient() {
  const searchParams = useSearchParams();
  const initialSubject = searchParams.get("subject") ?? "";
  const [subjectCode, setSubjectCode] = useState(
    initialSubject && VOCAB_BY_CODE[initialSubject] ? initialSubject : "",
  );

  const [mode, setMode] = useState<"list" | "cards">("list");
  const [query, setQuery] = useState("");

  const [deck, setDeck] = useState<Card[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const pool = useMemo(() => buildPool(subjectCode), [subjectCode]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pool;
    return pool.filter(
      (c) =>
        c.term.toLowerCase().includes(q) ||
        c.definition.toLowerCase().includes(q),
    );
  }, [pool, query]);

  // Selecting a subject or switching mode starts a fresh deck (event-driven,
  // no setState-in-effect)
  function selectSubject(code: string) {
    setSubjectCode(code);
    setDeck(shuffle(buildPool(code)));
    setIndex(0);
    setFlipped(false);
  }

  function switchMode(m: "list" | "cards") {
    setMode(m);
    setDeck(shuffle(buildPool(subjectCode)));
    setIndex(0);
    setFlipped(false);
  }

  const reshuffle = () => {
    setDeck(shuffle(buildPool(subjectCode)));
    setIndex(0);
    setFlipped(false);
  };

  const next = () => {
    setFlipped(false);
    setIndex((i) => Math.min(i + 1, deck.length - 1));
  };
  const prev = () => {
    setFlipped(false);
    setIndex((i) => Math.max(i - 1, 0));
  };

  // Keyboard: arrows navigate, space/enter flips
  useEffect(() => {
    if (mode !== "cards") return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, deck]);

  const current = deck[index];

  const subjectChips: { code: string; label: string; count: number }[] = [
    {
      code: "",
      label: "All subjects",
      count: pool.length,
    },
    ...VOCABULARY.map((s: VocabSubject) => ({
      code: s.code,
      label: s.code,
      count: s.terms.length,
    })),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Vocabulary</h1>
      <p className="mt-2 max-w-2xl text-black/60 dark:text-white/60">
        Every key term you&apos;re expected to know in semester 1 — with
        exam-ready definitions. Flip through the flashcards or search the list.
      </p>

      {/* Mode toggle */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="inline-flex overflow-hidden rounded-xl border border-black/15 bg-white dark:border-white/20 dark:bg-[#0a0a0a]">
          <button
            onClick={() => switchMode("list")}
            className={`px-5 py-2 text-sm font-medium transition ${
              mode === "list"
                ? "bg-emerald-600 text-white"
                : "hover:bg-black/5 dark:hover:bg-white/10"
            }`}
          >
            📋 List
          </button>
          <button
            onClick={() => switchMode("cards")}
            className={`px-5 py-2 text-sm font-medium transition ${
              mode === "cards"
                ? "bg-emerald-600 text-white"
                : "hover:bg-black/5 dark:hover:bg-white/10"
            }`}
          >
            🃏 Flashcards
          </button>
        </div>

        {mode === "list" && (
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms or definitions…"
            className="w-full max-w-xs rounded-xl border border-black/15 bg-white px-4 py-2 text-sm outline-none transition placeholder:text-black/40 focus:border-emerald-500 dark:border-white/20 dark:bg-[#0a0a0a] dark:placeholder:text-white/40"
          />
        )}
      </div>

      {/* Subject chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {subjectChips.map((chip) => {
          const active = subjectCode === chip.code;
          return (
            <button
              key={chip.code || "all"}
              onClick={() => selectSubject(chip.code)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                active
                  ? "border-emerald-600 bg-emerald-600 text-white shadow-sm"
                  : "border-black/15 bg-white text-black/70 hover:border-emerald-500/50 hover:text-black dark:border-white/20 dark:bg-[#0a0a0a] dark:text-white/70 dark:hover:text-white"
              }`}
            >
              {chip.label}
              <span
                className={`ml-1.5 text-xs ${
                  active ? "text-white/75" : "text-black/40 dark:text-white/40"
                }`}
              >
                {chip.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---------- Flashcards mode ---------- */}
      {mode === "cards" && deck.length > 0 && (
        <div className="mx-auto mt-10 max-w-2xl">
          {/* Progress */}
          <div className="flex items-center justify-between text-sm text-black/60 dark:text-white/60">
            <span>
              Card {index + 1} of {deck.length}
            </span>
            <button
              onClick={reshuffle}
              className="rounded-lg border border-black/15 px-3 py-1.5 text-sm transition hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
            >
              🔀 Shuffle
            </button>
          </div>
          <div className="mt-2 h-2 w-full rounded-full bg-black/10 dark:bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 transition-all"
              style={{ width: `${((index + 1) / deck.length) * 100}%` }}
            />
          </div>

          {/* Flip card */}
          <div className="mt-6 [perspective:1200px]">
            <button
              onClick={() => setFlipped((f) => !f)}
              className="relative block h-72 w-full cursor-pointer rounded-3xl text-left focus:outline-none sm:h-80"
              aria-label="Flip card"
            >
              <div
                className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]"
                style={flipped ? { transform: "rotateY(180deg)" } : undefined}
              >
                {/* Front: term */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-black/10 bg-gradient-to-br from-emerald-500/10 via-sky-500/5 to-transparent p-8 text-center shadow-md [backface-visibility:hidden] dark:border-white/10">
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                    {current.code}
                  </span>
                  <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                    {current.term}
                  </h2>
                  <span className="mt-6 text-xs text-black/40 dark:text-white/40">
                    Tap the card to see the definition
                  </span>
                </div>
                {/* Back: definition */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-emerald-500/30 bg-white p-8 text-center shadow-md [backface-visibility:hidden] [transform:rotateY(180deg)] dark:bg-[#111111]"
                >
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-700 dark:text-emerald-400">
                    {current.code} · Definition
                  </span>
                  <p className="mt-4 text-lg leading-relaxed text-black/85 dark:text-white/85">
                    {current.definition}
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button
              onClick={prev}
              disabled={index === 0}
              className="rounded-xl border border-black/15 px-6 py-3 font-medium transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/20 dark:hover:bg-white/10"
            >
              ← Prev
            </button>
            <button
              onClick={() => setFlipped((f) => !f)}
              className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 py-3 font-semibold text-white shadow-md shadow-emerald-500/25 transition hover:shadow-lg"
            >
              Flip
            </button>
            <button
              onClick={next}
              disabled={index === deck.length - 1}
              className="rounded-xl border border-black/15 px-6 py-3 font-medium transition hover:bg-black/5 disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/20 dark:hover:bg-white/10"
            >
              Next →
            </button>
          </div>
          <p className="mt-3 text-center text-xs text-black/40 dark:text-white/40">
            Tip: use ← / → keys to navigate and Space to flip.
          </p>
        </div>
      )}

      {/* ---------- List mode ---------- */}
      {mode === "list" && (
        <>
          <p className="mt-8 text-sm text-black/50 dark:text-white/50">
            {filtered.length} {filtered.length === 1 ? "term" : "terms"}
            {subjectCode && ` in ${subjectCode}`}
            {query.trim() && " matching your search"}.
          </p>
          {filtered.length === 0 ? (
            <p className="mt-4 rounded-xl border border-dashed border-black/15 p-6 text-sm text-black/50 dark:border-white/15 dark:text-white/50">
              No terms match &ldquo;{query.trim()}&rdquo;. Try a different word.
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              {filtered.map((c, i) => (
                <div
                  key={`${c.code}-${c.term}-${i}`}
                  className="rounded-xl border border-black/10 p-4 transition hover:border-emerald-600/40 dark:border-white/10 dark:hover:border-emerald-500/40"
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-semibold">{c.term}</h3>
                    {!subjectCode && (
                      <span className="shrink-0 font-mono text-xs text-emerald-700 dark:text-emerald-400">
                        {c.code}
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-black/70 dark:text-white/70">
                    {c.definition}
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
