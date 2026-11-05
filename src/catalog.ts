// Replace a placeholder by adding a JSON file under public/lottie/ and changing
// that entry's kind to "lottie" and src to the new path. Overwriting a file at
// the same path needs no code change.

export type AnimationKind = "svg" | "lottie";

export type AnimationEntry = {
  readonly id: string;
  readonly title: string;
  readonly kind: AnimationKind;
  readonly src: string;
};

export const animations = [
  {
    id: "orbit",
    title: "Orbit",
    kind: "svg",
    src: "/animations/orbit.svg",
  },
  {
    id: "pulse",
    title: "Pulse",
    kind: "svg",
    src: "/animations/pulse.svg",
  },
  {
    id: "bars",
    title: "Bars",
    kind: "svg",
    src: "/animations/bars.svg",
  },
  {
    id: "blob",
    title: "Blob",
    kind: "svg",
    src: "/animations/blob.svg",
  },
  {
    id: "pop",
    title: "Pop",
    kind: "lottie",
    src: "/lottie/pop.json",
  },
  {
    id: "spin",
    title: "Spin",
    kind: "lottie",
    src: "/lottie/spin.json",
  },
] as const satisfies readonly AnimationEntry[];
