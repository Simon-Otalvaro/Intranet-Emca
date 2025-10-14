import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Noticias.css";

const STORAGE_KEY = "intranet_noticias";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      setNoticias(raw ? JSON.parse(raw) : []);
    } catch {
      setNoticias([]);
    }
  }, []);

  return (
    <div className="noticias-container">
      <h1>📰 Noticias</h1>
      {noticias.length === 0 ? (
        <p>No hay noticias disponibles.</p>
      ) : (
        <div className="noticias-grid">
          {noticias.map((n) => (
            <div className="noticia-card" key={n.id}>
              {n.imagen && <img src={n.imagen} alt={n.titulo} />}
              <div className="noticia-content">
                <h2>{n.titulo}</h2>
                <p className="fecha">{n.fecha}</p>
                <p>{n.shortDesc}</p>
                <Link to={`/noticias/${n.id}`} className="ver-mas">Leer más →</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
