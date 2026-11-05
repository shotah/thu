import type { AnimationEntry } from "../catalog";
import LottieArtwork from "./LottieArtwork";
import SvgArtwork from "./SvgArtwork";

type AnimationCardProps = {
  entry: AnimationEntry;
};

export default function AnimationCard({ entry }: AnimationCardProps) {
  const kindLabel =
    entry.kind === "svg" ? "SVG placeholder" : "Lottie";

  return (
    <article className="card" data-animation-id={entry.id}>
      <header className="card__header">
        <h2 className="card__title">{entry.title}</h2>
        <p className="card__kind">{kindLabel}</p>
      </header>
      <div className="card__art">
        {entry.kind === "svg" ? (
          <SvgArtwork src={entry.src} title={entry.title} />
        ) : (
          <LottieArtwork src={entry.src} title={entry.title} />
        )}
      </div>
    </article>
  );
}
