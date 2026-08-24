import { useEffect, useState } from "react"

const Header = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark"
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light"
    setTheme(next)
    localStorage.setItem("theme", next)
  }

  return (
    <header className="flex items-center justify-between px-5 py-4">
      <h1 className="text-2xl font-bold tracking-tight text-ink">Regra de 3</h1>
      <button
        type="button"
        onClick={toggleTheme}
        className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-panel transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
        aria-label={theme === "dark" ? "Mudar para tema claro" : "Mudar para tema escuro"}
      >
        {theme === "dark" ? (
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
        ) : (
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
        )}
      </button>
    </header>
  )
}

export default Header
