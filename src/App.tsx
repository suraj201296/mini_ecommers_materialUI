import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthForm from "./components/auth/AuthForm";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Navbar from "./components/Navbar";
import { useState} from 'react'
import './App.css';
import Products from "./pages/Products";
import Users from "./pages/Users";
import ShowProduct from "./pages/ShowProduct";
import BuyProduct from "./pages/BuyProduct";
import ViewProfile from "./pages/ViewProfile";

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
            <Route path="/productDetails/:id" element={<ShowProduct/>}/>
            <Route path="/buy-product" element={<BuyProduct/>}/>
            <Route path="/viewProfile" element={<ViewProfile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
