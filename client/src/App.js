import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { SignUp } from './pages/SignUp';
import { Survey } from './pages/Survey';
import { About } from "./pages/About";
import { Results } from "./pages/Results";
import { MySearches } from "./pages/MySearches";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { PageNotFound } from "./pages/PageNotFound";
import { ResetPassword } from "./pages/ResetPassword";
import { Profile } from "./pages/Profile";
import { Terms } from "./pages/Terms";
import { Legal } from "./pages/Legal";
import { Privacy } from "./pages/PrivacyP";
import { useCookies } from 'react-cookie'


function App() {
  const [cookie, setCookies] = useCookies(["access_token"])
  return (
    <div className="App" style={{'backgroundColor': '#F7FAFC'}}>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login cookie={cookie} setCookies={setCookies}/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/signup' element={<SignUp/>} />
          <Route path='/survey' element={<Survey/>} />
          <Route path='/results' element={<Results/>} />
          <Route path='/mysearches' element={<MySearches cookie={cookie}/>} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/resetpassword' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile cookie={cookie}/>} />
          <Route path='/terms' element={<Terms />} />
          <Route path='/legal' element={<Legal />} />
          <Route path='/privacy' element={<Privacy />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </div>
  );
}

export default App;