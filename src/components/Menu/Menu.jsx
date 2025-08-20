import { useState } from "react";
import "./Menu.css";

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Menú hamburguesa */}
      <button 
        className={`menu-btn ${open ? "open" : ""}`} 
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Menú flotante */}
      <nav className={`menu ${open ? "active" : ""}`}>
        <ul>
          <li><a href="/utilidades">Utilidades</a></li>
          <li><a href="/nosotros">Nosotros</a></li>
          <li><a href="/eventos">Eventos</a></li>
        </ul>
      </nav>
    </>
  );
}
