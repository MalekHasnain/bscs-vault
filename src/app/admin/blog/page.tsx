import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import BlogEditor from "./blog-editor";

export const metadata = { title: "Blog Admin" };

export default async function AdminBlogPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?next=/admin/blog");

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

  const { data: posts } = await supabase
    .from("posts")
    .select("id, slug, title, status, published_at, updated_at, tags, excerpt")
    .order("updated_at", { ascending: false });

  return <BlogEditor posts={posts ?? []} />;
}
