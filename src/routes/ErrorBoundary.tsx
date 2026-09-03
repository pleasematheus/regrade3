import { isRouteErrorResponse, useRouteError } from "react-router-dom"

const ErrorBoundary = () => {
  const error = useRouteError()

  const title = isRouteErrorResponse(error) ? `Erro ${error.status}` : "Algo deu errado"
  const detail = isRouteErrorResponse(error)
    ? error.statusText || "A página solicitada não pôde ser carregada."
    : "Ocorreu um erro inesperado ao carregar a aplicação."

  return (
    <div
      role="alert"
      className="min-h-svh flex flex-col items-center justify-center gap-3 bg-canvas px-5 text-center"
    >
      <h1 className="text-2xl font-bold tracking-tight text-ink">{title}</h1>
      <p className="text-sm text-ink-muted max-w-sm">{detail}</p>
      <a
        href="/"
        className="mt-2 text-sm text-brand hover:text-brand-hover transition-colors duration-200"
      >
        Voltar para o início
      </a>
    </div>
  )
}

export default ErrorBoundary
