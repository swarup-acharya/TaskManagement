import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './App.css';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dasboard";

function AuthRedirector() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userLoggin")) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, []);
}

function App() {
  return (
    <BrowserRouter>
      <AuthRedirector />
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
