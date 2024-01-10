import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Navbar from "./components/Navbar";
import { useState} from 'react'
import './App.css';
import Products from "./pages/Products";
import Users from "./pages/Users";

function App() {
  
  const [ isAuth, setIsAuth ] = useState(localStorage.getItem('token') ? true : false);

  const handleLogin = () => {
    setIsAuth(true);
  }

  const handleLogout = () => {
    setIsAuth(false);
  }

  return (
    <BrowserRouter>
      {isAuth && <Navbar onLogout={handleLogout}/>}
      <Routes>
        <Route path="/login" element={<AuthForm onLogin={handleLogin}/>}/>
        <Route element={<ProtectedRoute/>} >
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/clothes" element={<Products/>}/>
            <Route path="/users" element={<Users/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
