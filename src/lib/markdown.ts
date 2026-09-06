import { marked } from "marked";

// Configure once. Content is admin-authored (trusted), rendered to HTML
// in server components via dangerouslySetInnerHTML.
marked.setOptions({
  gfm: true,
  breaks: false,
});

export function renderMarkdown(md: string): string {
  return marked.parse(md, { async: false }) as string;
}

export function readingTime(md: string): number {
  const words = md.trim().split(/\\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
