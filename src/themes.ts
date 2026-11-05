export const themes = [
  { id: "neon", label: "Neon" },
  { id: "mango", label: "Mango" },
  { id: "lagoon", label: "Lagoon" },
  { id: "candy", label: "Candy" },
] as const;

export type ThemeId = (typeof themes)[number]["id"];
