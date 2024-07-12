import './App.css';
import {BrowserRouter, Routes, Route} from'react-router-dom'
import Home from './pages/Home';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import PostDetails from './components/PostDetails';
import CreatePosts from './pages/CreatePosts';
import EditPosts from './pages/EditPosts';
import Profile from './pages/Profile';


function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        <Route exact path='/write' element={<CreatePosts/>}/>
        <Route exact path='/posts/post/:id' element={<PostDetails/>}/>
        <Route exact path='/edit/:id' element={<EditPosts/>}/>
        <Route exact path='/profile/:id' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
