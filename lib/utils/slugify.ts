import { slugify as slugifies } from "transliteration";

export function slugify(text: string): string {
  console.log(slugifies(text));
  return slugifies(text);
}
// export function slugify(text: string): string {
//   return text
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/-+/g, "-");
// }
