import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import {Home} from "./pages/Home"
import {Login} from "./pages/Login"
import {Navbar} from "./Navbar"
import {Footer} from "./Footer"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
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
