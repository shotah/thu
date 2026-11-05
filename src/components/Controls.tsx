import { layouts, type LayoutId } from "../layouts";
import { themes, type ThemeId } from "../themes";

type ControlsProps = {
  siteName: string;
  theme: ThemeId;
  layout: LayoutId;
  onThemeChange: (theme: ThemeId) => void;
  onLayoutChange: (layout: LayoutId) => void;
};

export default function Controls({
  siteName,
  theme,
  layout,
  onThemeChange,
  onLayoutChange,
}: ControlsProps) {
  return (
    <header className="bar">
      <h1 className="bar__title">{siteName}</h1>
      <div className="bar__controls">
        <label className="bar__field">
          <span className="bar__label">Theme</span>
          <select
            className="bar__select"
            value={theme}
            onChange={(e) => onThemeChange(e.target.value as ThemeId)}
          >
            {themes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </label>
        <label className="bar__field">
          <span className="bar__label">Layout</span>
          <select
            className="bar__select"
            value={layout}
            onChange={(e) => onLayoutChange(e.target.value as LayoutId)}
          >
            {layouts.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </header>
  );
}
