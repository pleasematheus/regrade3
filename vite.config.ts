import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { execSync } from "child_process"

const commitHash = execSync("git rev-parse --short HEAD").toString().trim()

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __COMMIT_HASH__: JSON.stringify(commitHash),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
