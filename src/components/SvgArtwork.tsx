import { useEffect, useState } from "react";

type SvgArtworkProps = {
  src: string;
  title: string;
};

export default function SvgArtwork({ src, title }: SvgArtworkProps) {
  const [markup, setMarkup] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const res = await fetch(src);
        if (!res.ok) return;
        const text = await res.text();
        if (cancelled) return;
        if (text.includes("<script")) return;
        setMarkup(text);
      } catch {
        /* ignore fetch errors */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <div className="artwork artwork--svg" aria-label={title}>
      {markup ? (
        <div className="artwork__inline" dangerouslySetInnerHTML={{ __html: markup }} />
      ) : (
        <span className="artwork__fallback">{title}</span>
      )}
    </div>
  );
}
