import { registerSW } from "virtual:pwa-register"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./routes/App.tsx"
import ErrorBoundary from "./routes/ErrorBoundary.tsx"
import "./index.css"

// autoUpdate: o service worker novo assume no próximo carregamento, sem
// aviso. A data no rodapé é a do build em cache, então segue verdadeira.
registerSW({ immediate: true })

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />,
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
