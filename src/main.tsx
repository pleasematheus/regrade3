import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import App from "./routes/App.tsx"
import ErrorBoundary from "./routes/ErrorBoundary.tsx"
import "./index.css"

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
