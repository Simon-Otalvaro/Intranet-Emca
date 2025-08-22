import "./Header.css";
import useLocalTime from "../../hooks/useLocalTime";
import { Link } from "react-router-dom";

export default function Header() {
  const { time, date } = useLocalTime();

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/">
          <img
            className="img-header"
            src="src/assets/images/logo-color.png"
            alt="Logo"
          />
        </Link>
        <hr className="divider" />
        <h1 className="title-header">
          INTRANET - EMPRESAS PÚBLICAS DE CALARCÁ E.S.P
        </h1>
        <div className="clock">
          <span className="time">{time}</span>
          <span className="date">{date}</span>
        </div>
      </nav>

      {/* Botón que redirige al login */}
      <Link className="login-button" to="/login">
        INGRESAR
      </Link>

      <div>
        <hr className="divider" />
      </div>
    </header>
  );
}
