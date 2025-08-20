import "./Header.css";
import useLocalTime from "../../hooks/useLocalTime";

export default function Header() {
  const { time, date } = useLocalTime();

  return (
    <header className="header">
      <nav className="nav">
        <a href="/">
           <img className="img-header" src="src/assets/images/logo-color.png" alt="Logo" />
        </a> 
        <hr className="divider" />
        <h1 className="title-header">INTRANET - EMPRESAS PÚBLICAS DE CALARCÁ E.S.P</h1>
         <div className="clock">
           <span className="time">{time}</span>
           <span className="date">{date}</span>
         </div>
      </nav>
      <a className="login-button" href="/login">INGRESAR</a>
      <div>
        <hr className="divider" />
      </div>
    </header>
  );
}
  