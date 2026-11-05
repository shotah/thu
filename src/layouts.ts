export const layouts = [
  { id: "stack", label: "Stack" },
  { id: "grid", label: "Grid" },
  { id: "feature", label: "Feature" },
  { id: "reel", label: "Reel" },
] as const;

export type LayoutId = (typeof layouts)[number]["id"];
