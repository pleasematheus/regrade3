import { useEffect, useState } from "react"

type Theme = "light" | "dark" | "system"

const THEMES: Theme[] = ["light", "dark", "system"]

const LABELS: Record<Theme, string> = {
  light: "Tema claro. Clique para usar o tema escuro",
  dark: "Tema escuro. Clique para usar o tema do sistema",
  system: "Tema do sistema. Clique para usar o tema claro",
}

const isTheme = (value: string | null): value is Theme =>
  value === "light" || value === "dark" || value === "system"

const SunIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <circle cx="12" cy="12" r="4" />
    <path
      strokeLinecap="round"
      d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07-7.07-1.41 1.41M8.34 15.66l-1.41 1.41m12.14 0-1.41-1.41M8.34 8.34 6.93 6.93"
    />
  </svg>
)

const MoonIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 15.26A9 9 0 0 1 8.74 2.25 9 9 0 1 0 21.75 15.26z"
    />
  </svg>
)

const SystemIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    className="w-5 h-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <rect x="2.75" y="4" width="18.5" height="12.5" rx="2" />
    <path strokeLinecap="round" d="M8.5 20h7m-3.5-3.5V20" />
  </svg>
)

const ICONS: Record<Theme, () => React.JSX.Element> = {
  light: SunIcon,
  dark: MoonIcon,
  system: SystemIcon,
}

const Header = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme")
    return isTheme(stored) ? stored : "system"
  })

  useEffect(() => {
    if (theme !== "system") {
      document.documentElement.dataset.theme = theme
      return
    }

    const query = window.matchMedia("(prefers-color-scheme: dark)")
    const apply = () => {
      document.documentElement.dataset.theme = query.matches ? "dark" : "light"
    }

    apply()
    query.addEventListener("change", apply)
    return () => query.removeEventListener("change", apply)
  }, [theme])

  const cycleTheme = () => {
    const next = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length]
    setTheme(next)
    localStorage.setItem("theme", next)
  }

  const Icon = ICONS[theme]

  return (
    <header className="flex items-center justify-between px-5 py-4">
      <h1 className="text-2xl font-bold tracking-tight text-ink">Regra de 3</h1>
      <button
        type="button"
        onClick={cycleTheme}
        className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-panel transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
        aria-label={LABELS[theme]}
        title={LABELS[theme]}
      >
        <Icon />
      </button>
    </header>
  )
}

export default Header
