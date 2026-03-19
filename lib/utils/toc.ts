import { slugify } from "./slugify";
import type { TocItem } from "@/lib/types";

// Recursively extract plain text from a TipTap node
function extractText(node: any): string {
  if (node.type === "text") return node.text ?? "";
  if (node.content?.length) return node.content.map(extractText).join("");
  return "";
}

// Extract all heading nodes from TipTap JSON content
export function extractToc(content: Record<string, any>): TocItem[] {
  if (!content?.content) return [];

  return content.content
    .filter((node: any) => node.type === "heading")
    .map((node: any) => {
      const text = extractText(node);
      return {
        id: slugify(text),
        text,
        level: node.attrs?.level ?? 2,
      };
    })
    .filter((item: TocItem) => item.text.length > 0);
}
