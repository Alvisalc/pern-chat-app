import { ModeToggle } from "./components/mode-toggle"
import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"
import Home from "./pages/Home"
import SignUp from "./pages/Signup"


function App() {
  return (
    <>
     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className="relative min-h-screen flex flex-col justify-center items-center">
        <div className="absolute top-4 right-4">
          <ModeToggle />
        </div>
        <div className="flex items-center justify-center w-full">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </div>
      </div>
      </Router>
      </ThemeProvider>
    </>
  )
}

export default App
