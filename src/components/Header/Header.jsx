import React, { useState, useEffect } from "react";
import "./Header.css";
import Login from "../Login/Login";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Función para actualizar reloj
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const optionsTime = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
      const optionsDate = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
      setTime(now.toLocaleTimeString("es-CO", optionsTime));
      setDate(now.toLocaleDateString("es-CO", optionsDate));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  const goToDashboard = () => {
  if (!user) return;
  if (user.role === "admin") navigate("/admin");
  if (user.role === "comunicaciones") navigate("/comunicaciones");
};


  return (
    <header className="header">
      {/* Sección izquierda: Logo + título */}
      <div className="header-left">
        <a href="/">
          <img
            className="img-header"
            src="src/assets/images/logo-color.png"
            alt="Logo"
          />
        </a>
        <hr className="divider" />
        <h1 className="title-header">
          INTRANET - EMPRESAS PÚBLICAS DE CALARCÁ E.S.P
        </h1>
      </div>

      {/* Sección central: Reloj */}
      <div className="header-center">
        <div className="clock">
          <span className="time">{time}</span>
          <span className="date">{date}</span>
        </div>
      </div>

      {/* Sección derecha: Login o acciones */}
      <div className="header-right">
{user ? (
  <div className="user-actions">
    <img
      src="src/assets/images/user-img.png"
      alt="Usuario"
      className="user-img"
      onClick={goToDashboard}
    />
    <button className="logout-button" onClick={handleLogout}>
      <img
        src="src/assets/images/logout-img.jpg"
        alt="Cerrar sesión"
        className="logout-img"
      />
    </button>
  </div>
) : (
  <button className="login-button" onClick={() => setShowLogin(true)}>
    INGRESAR
  </button>
)}

      </div>
      {/* Modal de login */}
      {showLogin && !user && (
        <div className="login-modal">
          <div
            className="login-modal-overlay"
            onClick={() => setShowLogin(false)}
          ></div>
          <div className="login-modal-content">
            <button className="login-close" onClick={() => setShowLogin(false)}>
              ✕
            </button>
            <Login onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
