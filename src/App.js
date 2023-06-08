import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import {Home} from "./pages/Home"
import {Login} from "./pages/Login"
import { SignUp } from './pages/SignUp';
import {About} from "./pages/About"
import {Navbar} from "./Navbar"
import {Footer} from "./Footer"
import {WithSubnavigation} from "./Navbar"


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        {/* <DesktopNav></DesktopNav> */}
        {/* <DesktopSubNav></DesktopSubNav> */}
        <WithSubnavigation></WithSubnavigation>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;
