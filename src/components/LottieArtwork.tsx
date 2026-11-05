import lottie, { type AnimationItem } from "lottie-web/build/player/lottie_svg";
import { useEffect, useRef, useState } from "react";

type LottieArtworkProps = {
  src: string;
  title: string;
};

export default function LottieArtwork({ src, title }: LottieArtworkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let anim: AnimationItem | undefined;

    setFailed(false);

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    void (async () => {
      try {
        const res = await fetch(src);
        if (!res.ok) {
          if (!cancelled) setFailed(true);
          return;
        }
        const animationData: unknown = await res.json();
        if (cancelled) return;

        const container = containerRef.current;
        if (!container) return;

        anim = lottie.loadAnimation({
          container,
          renderer: "svg",
          loop: !reducedMotion,
          autoplay: !reducedMotion,
          animationData,
        });

        if (reducedMotion) {
          anim.goToAndStop(0, true);
        }
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
      anim?.destroy();
    };
  }, [src]);

  return (
    <div className="artwork artwork--lottie" aria-label={title}>
      {failed ? (
        <span className="artwork__fallback">{title}</span>
      ) : (
        <div ref={containerRef} className="artwork--lottie__host" />
      )}
    </div>
  );
}
