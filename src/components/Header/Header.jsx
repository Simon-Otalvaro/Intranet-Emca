import "./Header.css";
import useLocalTime from "../../hooks/useLocalTime";
import { useState } from "react";
import Login from "../Login/Login";
import { useAuth } from "../../Context/AuthContext";

export default function Header() {
  const { time, date } = useLocalTime();
  const [showLogin, setShowLogin] = useState(false);
  const { user, logout } = useAuth();

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

        {user ? (
          <button className="login-button" onClick={logout}>
            CERRAR SESIÓN
          </button>
        ) : (
          <button className="login-button" onClick={() => setShowLogin(true)}>
            INGRESAR
          </button>
        )}
      </nav>

      {showLogin && (
        <div className="login-modal">
          <div
            className="login-modal-overlay"
            onClick={() => setShowLogin(false)}
          ></div>
          <div className="login-modal-content">
            <button
              className="login-close"
              onClick={() => setShowLogin(false)}
            >
              ✕
            </button>
            <Login onClose={() => setShowLogin(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
