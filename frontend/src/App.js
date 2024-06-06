import './App.css';
import {BrowserRouter, Routes, Route} from'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/about' element={<About/>}/>
        <Route exact path='/sign-in' element={<SignIn/>}/>
        <Route exact path='/sign-up' element={<SignUp/>}/>
        <Route exact path='/dashboard' element={<Dashboard/>}/>
        <Route exact path='/projects' element={<Projects/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
