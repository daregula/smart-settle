import './styles/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import {Home} from "./pages/Home"
import {Login} from "./pages/Login"
import {Navbar} from "./Navbar"
import { CloseIcon } from '@chakra-ui/icons'
function App() {
  return (
    <div className="App">
      <CloseIcon/>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
