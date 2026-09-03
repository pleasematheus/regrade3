import { execSync } from "node:child_process"
import path from "node:path"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"
import { defineConfig } from "vitest/config"

let commitHash = "unknown"
let commitDate = "unknown"
try {
  commitHash = execSync("git rev-parse --short HEAD", { stdio: ["pipe", "pipe", "pipe"] })
    .toString()
    .trim()
  commitDate = execSync("git log -1 --format=%cd --date=format:%d/%m/%Y", {
    stdio: ["pipe", "pipe", "pipe"],
  })
    .toString()
    .trim()
} catch {
  // git not available in this build context (e.g. ownership mismatch)
}

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["calculator.svg", "apple-touch-icon.png"],
      workbox: {
        // woff e ttf são fallback do @font-face; todo navegador com service
        // worker suporta woff2, então precachear os três desperdiça cota.
        globPatterns: ["**/*.{js,css,html,svg,woff2}"],
        navigateFallback: "/index.html",
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: "Regra de 3",
        short_name: "Regra de 3",
        description: "Faça seus cálculos com a regra de 3 rapidamente e em tempo real!",
        lang: "pt-BR",
        start_url: "/",
        scope: "/",
        display: "standalone",
        background_color: "#252525",
        theme_color: "#2ec4b6",
        icons: [
          { src: "/pwa-192.png", sizes: "192x192", type: "image/png" },
          { src: "/pwa-512.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __COMMIT_HASH__: JSON.stringify(commitHash),
    __COMMIT_DATE__: JSON.stringify(commitDate),
  },
  test: {
    include: ["src/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
})
