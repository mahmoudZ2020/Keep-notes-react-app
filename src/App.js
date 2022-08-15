import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import Notfound from './Components/Notfound';

import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';



function App() {
  return (
  <>
  <Navbar/>

  <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route path='*' element={<Notfound/>}/>
  </Routes>
 
  </>
  );
}

export default App;
