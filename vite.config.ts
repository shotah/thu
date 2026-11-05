import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: false,
      },
      manifest: {
        name: "thu",
        short_name: "thu",
        display: "standalone",
        start_url: "/",
        scope: "/",
        theme_color: "#1a1a2e",
        background_color: "#1a1a2e",
        icons: [
          {
            src: "/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
          },
        ],
      },
      workbox: {
        globPatterns: [
          "**/*.{js,css,html,svg,png,ico,webmanifest,json}",
        ],
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api/],
      },
    }),
    cloudflare({
      viteEnvironment: { name: "worker" },
    }),
  ],
  environments: {
    worker: {
      build: {
        sourcemap: true,
      },
    },
  },
});
