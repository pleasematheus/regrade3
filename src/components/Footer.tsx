const CURRENT_YEAR = new Date().getFullYear()

const Footer = () => {
  return (
    <footer className="w-full text-center py-3 px-4 border-t border-edge-subtle">
      <p className="text-sm text-ink-muted">
        © 2024–{CURRENT_YEAR} ·{" "}
        <a
          href="https://pleasematheus.dev/"
          target="_blank"
          className="text-brand hover:text-brand-hover transition-colors duration-200"
        >
          pleasematheus
        </a>
      </p>
      <p className="text-xs text-ink-muted/50 mt-0.5">
        v{__APP_VERSION__} · {__COMMIT_HASH__} · {__COMMIT_DATE__}
      </p>
    </footer>
  )
}

export default Footer
