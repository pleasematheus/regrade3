import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { execSync } from "child_process"

let commitHash = "unknown"
let commitDate = "unknown"
try {
  commitHash = execSync("git rev-parse --short HEAD", { stdio: ["pipe", "pipe", "pipe"] }).toString().trim()
  commitDate = execSync("git log -1 --format=%cd --date=format:%d/%m/%Y", { stdio: ["pipe", "pipe", "pipe"] }).toString().trim()
} catch {
  // git not available in this build context (e.g. ownership mismatch)
}

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __COMMIT_HASH__: JSON.stringify(commitHash),
    __COMMIT_DATE__: JSON.stringify(commitDate),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
