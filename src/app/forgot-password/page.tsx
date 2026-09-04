"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16">
      <h1 className="text-center text-2xl font-bold">Reset your password</h1>
      <p className="mt-2 text-center text-sm text-black/60 dark:text-white/60">
        Enter your account email and we&apos;ll send you a secure reset link.
      </p>

      {sent ? (
        <div className="mt-8 rounded-xl bg-emerald-500/10 p-5 text-center">
          <p className="font-medium text-emerald-700 dark:text-emerald-400">
            📧 Reset link sent!
          </p>
          <p className="mt-2 text-sm text-black/70 dark:text-white/70">
            Check <strong>{email}</strong> (and your spam folder). The link
            expires in 1 hour.
          </p>
          <a
            href="/login"
            className="mt-4 inline-block rounded-lg border border-black/15 px-5 py-2 text-sm font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
          >
            ← Back to login
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-black/15 bg-transparent px-3 py-2 dark:border-white/20"
              placeholder="you@example.com"
            />
          </div>
          {error && (
            <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-emerald-600 py-2.5 font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
          >
            {loading ? "Sending…" : "Send reset link"}
          </button>
          <a
            href="/login"
            className="text-center text-sm text-emerald-600 hover:underline dark:text-emerald-400"
          >
            ← Back to login
          </a>
        </form>
      )}
    </div>
  );
}
