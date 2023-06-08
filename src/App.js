import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import {Home} from "./pages/Home"
import {Login} from "./pages/Login"
import {Navbar} from "./Navbar"
import {Footer} from "./Footer"
import {WithSubnavigation} from "./Navbar"
import {SimpleCard} from "./pages/Login"


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        {/* might not need this shit under */}
        {/* <DesktopNav></DesktopNav> */}
        {/* <DesktopSubNav></DesktopSubNav> */}
        <WithSubnavigation></WithSubnavigation>
        <SimpleCard></SimpleCard>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/about' element={<Login/>} />
          <Route path='/contact' element={<Login/>} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;