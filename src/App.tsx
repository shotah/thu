import { useEffect, useState } from "react";
import { animations } from "./catalog";
import AnimationCard from "./components/AnimationCard";
import Controls from "./components/Controls";
import { layouts, type LayoutId } from "./layouts";
import { readStorage, writeStorage } from "./storage";
import { themes, type ThemeId } from "./themes";

const THEME_KEY = "thu-theme";
const LAYOUT_KEY = "thu-layout";
const DEFAULT_THEME: ThemeId = "neon";
const DEFAULT_LAYOUT: LayoutId = "stack";

function parseTheme(stored: string | null): ThemeId {
  if (stored && themes.some((t) => t.id === stored)) {
    return stored as ThemeId;
  }
  return DEFAULT_THEME;
}

function parseLayout(stored: string | null): LayoutId {
  if (stored && layouts.some((l) => l.id === stored)) {
    return stored as LayoutId;
  }
  return DEFAULT_LAYOUT;
}

export default function App() {
  const siteName = import.meta.env.VITE_SITE_NAME;
  const [theme, setTheme] = useState<ThemeId>(() =>
    parseTheme(readStorage(THEME_KEY)),
  );
  const [layout, setLayout] = useState<LayoutId>(() =>
    parseLayout(readStorage(LAYOUT_KEY)),
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    writeStorage(THEME_KEY, theme);
  }, [theme]);

  const handleThemeChange = (next: ThemeId) => {
    setTheme(next);
  };

  const handleLayoutChange = (next: LayoutId) => {
    setLayout(next);
    writeStorage(LAYOUT_KEY, next);
  };

  return (
    <div className="page">
      <Controls
        siteName={siteName}
        theme={theme}
        layout={layout}
        onThemeChange={handleThemeChange}
        onLayoutChange={handleLayoutChange}
      />
      <section
        className="stage"
        aria-label="Animations"
        data-layout={layout}
      >
        {animations.map((entry) => (
          <AnimationCard key={entry.id} entry={entry} />
        ))}
      </section>
    </div>
  );
}
