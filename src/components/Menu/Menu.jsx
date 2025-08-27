import { useState } from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button 
        className={`menu-btn ${open ? "open" : ""}`} 
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>


      <nav className={`menu ${open ? "active" : ""}`}>
        <h1 className="title">Menú IntraNet</h1>
        <ul>
          <li>
            <Link to="/" onClick={() => setOpen(false)}>Inicio</Link>
          </li>
          <li>
            <Link to="/utilidades" onClick={() => setOpen(false)}>Utilidades</Link>
          </li>
          <li>
            <Link to="/nosotros" onClick={() => setOpen(false)}>Nosotros</Link>
          </li>
          <li>
            <Link to="/noticias" onClick={() => setOpen(false)}>Noticias</Link>
          </li>
          <li>
            <Link to="/eventos" onClick={() => setOpen(false)}>Eventos</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
