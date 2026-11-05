import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import App from "../src/App";
import { animations } from "../src/catalog";

vi.mock("lottie-web/build/player/lottie_svg", () => ({
  default: {
    loadAnimation: vi.fn(() => ({
      destroy: vi.fn(),
      goToAndStop: vi.fn(),
    })),
  },
}));

describe("App", () => {
  it("shows the site name", () => {
    render(<App />);
    expect(screen.getByRole("heading", { level: 1, name: "thu" })).toBeInTheDocument();
  });

  it("renders all animation titles", () => {
    render(<App />);
    for (const entry of animations) {
      expect(
        screen.getByRole("heading", { level: 2, name: entry.title }),
      ).toBeInTheDocument();
    }
  });

  it("applies theme from the Theme select", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(screen.getByLabelText("Theme"), "mango");
    expect(document.documentElement.getAttribute("data-theme")).toBe("mango");
  });

  it("applies layout from the Layout select", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.selectOptions(screen.getByLabelText("Layout"), "reel");
    expect(screen.getByRole("region", { name: "Animations" }).getAttribute("data-layout")).toBe(
      "reel",
    );
  });
});
