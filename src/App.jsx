
import {Routes, Route} from "react-router-dom"
import Home from "./Pages/Home"
import NavBar from "./Components/NavBar"
import SignUpModal from "./Components/SignUpModal"

function App() {

  
  return (
    <>
    <SignUpModal />
    <NavBar />
     <Routes>
        <Route path='/' element={<Home />}/>
     </Routes>
    </>
  )
}

export default App
