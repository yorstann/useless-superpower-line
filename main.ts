import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "One Line, Zero Use: The Useless
// Superpower Sprint" bounty. The program writes a single line to
// /output/entry.txt (or $OUTPUT_DIR/entry.txt): a superpower that
// sounds epic for exactly one beat — instant teleportation anywhere
// on Earth — and then collapses into worthlessness with the catch:
// only to places the hero has already reached the slow way, on foot.
// The joke is the gap between the power's promise and its one
// condition, which arrives in the last few words.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the line.
const POWER_BEATS = [
  "I can teleport instantly to anywhere on Earth —",
  "as long as I've already walked there.",
] as const;

export function buildEntryLine(): string {
  return POWER_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 200;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
