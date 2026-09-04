import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import AdminDashboard from "./admin-dashboard";

export const metadata = { title: "Admin" };

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/admin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin, username")
    .eq("id", user.id)
    .single();

  if (!profile?.is_admin) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Admins only</h1>
        <p className="mt-2 text-black/60 dark:text-white/60">
          You are logged in as <strong>{profile?.username}</strong>, but this
          account is not a moderator.
        </p>
      </div>
    );
  }

  const [{ data: pendingQuestions }, { data: pendingHandouts }, { data: subjects }] =
    await Promise.all([
      supabase
        .from("questions")
        .select("*, subjects(code, title), profiles(username)")
        .eq("status", "pending")
        .order("created_at", { ascending: true }),
      supabase
        .from("handouts")
        .select("*, subjects(code, title), profiles(username)")
        .eq("status", "pending")
        .order("created_at", { ascending: true }),
      supabase.from("subjects").select("*").order("code"),
    ]);

  return (
    <AdminDashboard
      pendingQuestions={pendingQuestions ?? []}
      pendingHandouts={pendingHandouts ?? []}
      subjects={subjects ?? []}
    />
  );
}
