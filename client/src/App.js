import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Contact } from "./pages/Contact"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { SignUp } from './pages/SignUp';
import { Survey } from './pages/Survey';
import { About } from "./pages/About"
import { Results } from "./pages/Results"
import { MySearches } from "./pages/MySearches"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { PageNotFound } from "./pages/PageNotFound"
import { WithSubnavigation } from "./Navbar"
import { ResetPassword } from "./pages/ResetPassword"

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        {/* might not need this shit under */}
        {/* <DesktopNav></DesktopNav> */}
        {/* <DesktopSubNav></DesktopSubNav> */}
        <WithSubnavigation></WithSubnavigation>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/survey' element={<Survey/>} />
          <Route path='/results' element={<Results/>} />
          <Route path='/mysearches' element={<MySearches/>} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;