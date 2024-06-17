import { ThemeProvider } from "@/components/theme-provider"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login"
import Home from "./pages/Home"
import SignUp from "./pages/Signup"
import Navbar from "./components/Navbar";
import { useAuthContext } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";


function App() {
  const { authUser, isLoading} = useAuthContext();

  if(isLoading) return null;

  return (
    <>
     <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Navbar/>
        <div className="relative min-h-screen flex flex-col justify-center items-center">
          <div className="flex items-center justify-center w-full">
            <Routes>
              {/* check if the user is authenicated to protect the "Home" content page */}
              <Route path="/" element={authUser ? <Home/> : <Navigate to={"login"}/>} />
              <Route path="/signup" element={!authUser ? <SignUp/> : <Navigate to={"/"}/>} />
              <Route path="/login" element={!authUser ? <Login/> : <Navigate to={"/"}/>} />
            </Routes>
          </div>
        </div>
        <Toaster/>
      </Router>
      </ThemeProvider>
    </>
  )
}

export default App
