import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = "BSCS Vault article";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  // Titles are read from the URL-less slug — fetch just the title
  const { createClient } = await import("@/lib/supabase-server");
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("title")
    .eq("slug", params.slug)
    .eq("status", "published")
    .maybeSingle();

  const title = data?.title ?? "BSCS Vault Article";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #052e22 0%, #064e3b 45%, #0c4a6e 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #10b981, #0ea5e9)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            BV
          </div>
          <div style={{ color: "#a7f3d0", fontSize: 28, fontWeight: 600 }}>
            {SITE_NAME}
          </div>
        </div>

        <div
          style={{
            color: "white",
            fontSize: title.length > 60 ? 56 : 68,
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            maxWidth: 1050,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#86efac",
            fontSize: 26,
          }}
        >
          <div>VU Past Papers · MCQs · Handouts · GPA Tools</div>
          <div>bscs-group-vu.vercel.app</div>
        </div>
      </div>
    ),
    size,
  );
}
