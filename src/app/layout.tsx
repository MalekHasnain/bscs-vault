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
    default: "BSCS Vault — VU Past Papers, MCQs & Handouts",
    template: "%s — BSCS Vault",
  },
  description:
    "Free crowd-sourced past papers, MCQ practice and handouts for Virtual University BSCS students.",
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
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .single();
    isAdmin = profile?.is_admin ?? false;
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-black/10 dark:border-white/15">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-600 text-sm text-white">
                BV
              </span>
              BSCS Vault
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link href="/subjects" className="hover:underline">
                Subjects
              </Link>
              <Link href="/practice" className="hidden sm:inline hover:underline">
                Practice
              </Link>
              <Link href="/submit" className="hover:underline">
                Submit
              </Link>
              {isAdmin && (
                <Link href="/admin" className="hover:underline">
                  Admin
                </Link>
              )}
              {user ? (
                <form action="/auth/signout" method="post">
                  <button className="rounded-md border border-black/15 px-3 py-1 hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10">
                    Sign out
                  </button>
                </form>
              ) : (
                <Link
                  href="/login"
                  className="rounded-md bg-emerald-600 px-3 py-1 text-white hover:bg-emerald-700"
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-black/10 dark:border-white/15 py-6 text-center text-sm text-black/60 dark:text-white/60">
          <p>
            BSCS Vault — by students, for students. Not affiliated with Virtual
            University of Pakistan.
          </p>
        </footer>
      </body>
    </html>
  );
}
