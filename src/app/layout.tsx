import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BSCS Vault — VU Past Papers, MCQs, GPA Tools & Handouts",
    template: "%s — BSCS Vault",
  },
  description:
    "Free student-built hub for Virtual University BSCS students: past papers, MCQ practice, handouts, GPA calculator and CGPA projector.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;
  let avatarUrl: string | null = null;
  let username = "";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin, avatar_url, username")
      .eq("id", user.id)
      .single();
    isAdmin = profile?.is_admin ?? false;
    avatarUrl = profile?.avatar_url ?? null;
    username = profile?.username ?? "";
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="sticky top-0 z-50 border-b border-black/10 bg-white/70 backdrop-blur-md dark:border-white/10 dark:bg-[#0a0a0a]/70">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-sky-500 text-sm text-white shadow-md">
                BV
              </span>
              <span className="hidden sm:inline">BSCS Vault</span>
            </Link>
            <nav className="flex items-center gap-1 text-sm sm:gap-2">
              <Link
                href="/subjects"
                className="rounded-lg px-3 py-2 text-black/70 transition hover:bg-black/5 hover:text-black dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
              >
                Subjects
              </Link>
              <Link
                href="/practice"
                className="rounded-lg px-3 py-2 text-black/70 transition hover:bg-black/5 hover:text-black dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
              >
                Practice
              </Link>
              <Link
                href="/gpa"
                className="rounded-lg px-3 py-2 text-black/70 transition hover:bg-black/5 hover:text-black dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
              >
                GPA Tools
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="rounded-lg px-3 py-2 text-black/70 transition hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/10"
                >
                  Admin
                </Link>
              )}
              {user ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/submit"
                    className="hidden rounded-lg border border-emerald-600/40 px-3 py-2 font-medium text-emerald-700 transition hover:bg-emerald-500/10 sm:block dark:text-emerald-400"
                  >
                    + Submit
                  </Link>
                  <Link
                    href="/dashboard"
                    title={username}
                    className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-emerald-500/50 transition hover:ring-emerald-500"
                  >
                    {avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={avatarUrl}
                        alt={username}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-500 to-sky-500 text-xs font-bold text-white">
                        {username.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </Link>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 px-4 py-2 font-medium text-white shadow-md transition hover:shadow-lg"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </header>

        <main className="flex-1">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-emerald-500/10 via-sky-500/5 to-transparent dark:from-emerald-500/[0.07] dark:via-sky-500/[0.04]"
          />
          {children}
        </main>

        <footer className="border-t border-black/10 py-8 dark:border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-4 text-center text-sm text-black/50 dark:text-white/50">
            <p>
              <span className="font-semibold text-black/70 dark:text-white/70">
                BSCS Vault
              </span>{" "}
              — by students, for students. Not affiliated with Virtual
              University of Pakistan.
            </p>
            <p>
              Past papers · MCQ practice · Handouts ·{" "}
              <Link href="/gpa" className="underline hover:text-emerald-600">
                GPA &amp; CGPA tools
              </Link>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
