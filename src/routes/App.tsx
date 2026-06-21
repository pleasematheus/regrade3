import Header from "../components/Header"
import Inputs from "@/components/Inputs"
import Footer from "@/components/Footer"

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-canvas">
      <Header />
      <main className="flex-1 flex items-start justify-center px-4 py-8">
        <Inputs />
      </main>
      <Footer />
    </div>
  )
}

export default App
