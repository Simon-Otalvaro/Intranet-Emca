import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaTools,
  FaUsers,
  FaNewspaper,
  FaCalendarAlt,
} from "react-icons/fa";
import "./Menu.css";

export default function Menu() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Inicio", path: "/", icon: <FaHome /> },
    { name: "Utilidades", path: "/utilidades", icon: <FaTools /> },
    { name: "Nosotros", path: "/nosotros", icon: <FaUsers /> },
    { name: "Noticias", path: "/noticias", icon: <FaNewspaper /> },
    { name: "Eventos", path: "/eventos", icon: <FaCalendarAlt /> },
  ];

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        className={`menu-btn ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Abrir menú"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Overlay */}
      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}

      {/* Drawer */}
      <nav className={`menu-drawer ${open ? "active" : ""}`}>
        {/* Encabezado con logo y título */}
        <div className="menu-header">
          <img src="src/assets/images/logo-color.png" alt="Logo Empresa" />
          <h1>IntraNet EMCA</h1>
        </div>

        <ul>
          {links.map((link) => (
            <li key={link.name}>
              <Link to={link.path} onClick={() => setOpen(false)}>
                <span className="icon">{link.icon}</span>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <footer className="menu-footer">
          <p>© 2025 EMCA</p>
        </footer>
      </nav>
    </>
  );
}
