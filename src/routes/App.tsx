import Footer from "@/components/Footer"
import Inputs from "@/components/Inputs"
import Header from "../components/Header"

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
