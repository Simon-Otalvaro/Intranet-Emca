import "./Header.css";
import useLocalTime from "../../hooks/useLocalTime";
import { useState } from "react";
import Login from "../Login/Login"; // Importamos el login

export default function Header() {
  const { time, date } = useLocalTime();
  const [showLogin, setShowLogin] = useState(false);

  return (
    <header className="header">
      <nav className="nav">
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
        <div className="clock">
          <span className="time">{time}</span>
          <span className="date">{date}</span>
        </div>
      </nav>

      <button className="login-button" onClick={() => setShowLogin(true)}>
        INGRESAR
      </button>

      <div>
        <hr className="divider" />
      </div>

      {showLogin && (
        <div className="login-modal">
          <div
            className="login-modal-overlay"
            onClick={() => setShowLogin(false)}
          />
          <div className="login-modal-content">
            <button className="login-close" onClick={() => setShowLogin(false)}>
              ✕
            </button>
            <Login />
          </div>
        </div>
      )}
    </header>
  );
}
