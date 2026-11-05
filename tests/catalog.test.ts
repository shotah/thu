import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { animations } from "../src/catalog";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");

describe("catalog assets", () => {
  it("every src points at a file under public/", () => {
    for (const entry of animations) {
      const filePath = join(repoRoot, "public", entry.src.replace(/^\//, ""));
      expect(existsSync(filePath), `${entry.src} should exist`).toBe(true);
    }
  });

  it("SVG files contain svg markup and keyframes", () => {
    for (const entry of animations.filter((a) => a.kind === "svg")) {
      const filePath = join(repoRoot, "public", entry.src.replace(/^\//, ""));
      const text = readFileSync(filePath, "utf8");
      expect(text).toContain("<svg");
      expect(text).toContain("@keyframes");
      expect(text.includes("<script")).toBe(false);
    }
  });

  it("Lottie files parse as valid animation JSON", () => {
    for (const entry of animations.filter((a) => a.kind === "lottie")) {
      const filePath = join(repoRoot, "public", entry.src.replace(/^\//, ""));
      const text = readFileSync(filePath, "utf8");
      expect(text.includes("<script")).toBe(false);
      const data = JSON.parse(text) as {
        v: string;
        w: number;
        h: number;
        layers: unknown[];
      };
      expect(typeof data.v).toBe("string");
      expect(typeof data.w).toBe("number");
      expect(typeof data.h).toBe("number");
      expect(Array.isArray(data.layers)).toBe(true);
      expect(data.layers.length).toBeGreaterThan(0);
    }
  });
});
