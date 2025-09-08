import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./NoticiaDetalle.css";

const STORAGE_KEY = "intranet_noticias";

export default function NoticiaDetalle() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    const found = arr.find((x) => x.id === id);
    setNoticia(found || null);
  }, [id]);

  if (!noticia) return <p>Noticia no encontrada.</p>;

  return (
    <div className="detalle-container">
      {noticia.imagen && (
        <img className="detalle-img" src={noticia.imagen} alt={noticia.titulo} />
      )}
      <h1>{noticia.titulo}</h1>
      <p className="fecha">{noticia.fecha}</p>
      <div className="contenido">{noticia.contenido}</div>
      <Link to="/noticias" className="volver-btn">← Volver</Link>
    </div>
  );
}
