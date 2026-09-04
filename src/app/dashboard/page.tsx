import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import DashboardClient from "./dashboard-client";

export const metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/dashboard");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Contribution counts (any status — they submitted it)
  const [{ count: questionsSubmitted }, { count: handoutsSubmitted }] =
    await Promise.all([
      supabase
        .from("questions")
        .select("*", { count: "exact", head: true })
        .eq("created_by", user.id),
      supabase
        .from("handouts")
        .select("*", { count: "exact", head: true })
        .eq("uploaded_by", user.id),
    ]);

  // Breakdown of their questions by status
  const { data: myQuestions } = await supabase
    .from("questions")
    .select("status, q_type, subjects(code)")
    .eq("created_by", user.id)
    .order("created_at", { ascending: false });

  const approved =
    myQuestions?.filter((q) => q.status === "approved").length ?? 0;
  const pending = myQuestions?.filter((q) => q.status === "pending").length ?? 0;
  const rejected =
    myQuestions?.filter((q) => q.status === "rejected").length ?? 0;

  const bySubject = new Map<string, number>();
  for (const q of myQuestions ?? []) {
    const code = (q.subjects as { code: string } | null)?.code ?? "?";
    bySubject.set(code, (bySubject.get(code) ?? 0) + 1);
  }

  return (
    <DashboardClient
      username={profile?.username ?? "student"}
      avatarUrl={profile?.avatar_url ?? null}
      isAdmin={profile?.is_admin ?? false}
      stats={{
        questions: questionsSubmitted ?? 0,
        handouts: handoutsSubmitted ?? 0,
        approved,
        pending,
        rejected,
        bySubject: Object.fromEntries(bySubject),
      }}
    />
  );
}
