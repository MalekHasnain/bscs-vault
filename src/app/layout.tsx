import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import { SITE_URL, SITE_NAME, SITE_TAGLINE } from "@/lib/site";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description:
    "Free student-built hub for Virtual University BSCS students: past papers, MCQ practice, handouts, vocabulary, GPA calculator and CGPA projector.",
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
  },
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
            <Link href="/" className="flex items-center gap-2.5 font-bold">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.svg"
                alt="BSCS Vault logo"
                width={32}
                height={32}
                className="h-8 w-8 rounded-lg shadow-sm"
              />
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
                href="/vocabulary"
                className="rounded-lg px-3 py-2 text-black/70 transition hover:bg-black/5 hover:text-black dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <span className="sm:hidden">Vocab</span>
                <span className="hidden sm:inline">Vocabulary</span>
              </Link>
              <Link
                href="/gpa"
                className="rounded-lg px-3 py-2 text-black/70 transition hover:bg-black/5 hover:text-black dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
              >
                GPA Tools
              </Link>
              <Link
                href="/notices"
                className="hidden rounded-lg px-3 py-2 text-black/70 transition hover:bg-black/5 hover:text-black dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white md:block"
              >
                Notices
              </Link>
              <Link
                href="/blog"
                className="rounded-lg px-3 py-2 text-black/70 transition hover:bg-black/5 hover:text-black dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
              >
                Blog
              </Link>
              <Link
                href="/faq"
                className="hidden rounded-lg px-3 py-2 text-black/70 transition hover:bg-black/5 hover:text-black dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white sm:block"
              >
                FAQ
              </Link>
              {user ? (
                <div className="flex items-center gap-2">
                  <Link
                    href="/submit"
                    className="hidden rounded-lg border border-emerald-600/40 px-3 py-2 font-medium text-emerald-700 transition hover:bg-emerald-500/10 sm:block dark:text-emerald-400"
                  >
                    + Submit
                  </Link>
                  <details className="group relative">
                    <summary
                      className="h-9 w-9 cursor-pointer list-none overflow-hidden rounded-full ring-2 ring-emerald-500/50 transition hover:ring-emerald-500 [&::-webkit-details-marker]:hidden"
                      title={username}
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
                    </summary>
                    <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg dark:border-white/10 dark:bg-[#141414]">
                      <div className="border-b border-black/5 px-4 py-2.5 text-xs font-semibold text-black/50 dark:border-white/10 dark:text-white/50">
                        {username}
                      </div>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2.5 text-sm hover:bg-black/5 dark:hover:bg-white/10"
                      >
                        My Dashboard
                      </Link>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2.5 text-sm hover:bg-black/5 dark:hover:bg-white/10"
                        >
                          Admin
                        </Link>
                      )}
                      <form action="/auth/signout" method="post">
                        <button
                          type="submit"
                          className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-500/10 dark:text-red-400"
                        >
                          Log out
                        </button>
                      </form>
                    </div>
                  </details>
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
            <p>Created by Malik Hasnain</p>
            <p>
              Past papers · MCQ practice · Vocabulary · Handouts · Blog ·{" "}
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
