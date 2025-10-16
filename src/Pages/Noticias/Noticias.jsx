import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Noticias.css";

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const res = await axios.get("http://localhost:3000/news");
        setNoticias(res.data);
      } catch (error) {
        console.error("Error al obtener noticias:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticias();
  }, []);

  if (loading) return <p>Cargando noticias...</p>;

  return (
    <div className="noticias-container">
      <h1>📰 Noticias</h1>
      {noticias.length === 0 ? (
        <p>No hay noticias disponibles.</p>
      ) : (
        <div className="noticias-grid">
          {noticias.map((n) => (
            <div className="noticia-card" key={n.id}>
              {n.imagen && (
  <img
    src={`http://localhost:3000/uploads/news/${n.imagen}`}
    alt={n.titulo}
  />
)}

              <div className="noticia-content">
                <h2>{n.titulo}</h2>
                <p className="fecha">
                  {new Date(n.fechaPublicacion).toLocaleDateString("es-CO", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <p>{n.shortDesc}</p>
                <Link to={`/noticias/${n.id}`} className="ver-mas">
                  Leer más →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
