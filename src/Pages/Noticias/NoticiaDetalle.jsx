import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./NoticiaDetalle.css";

export default function NoticiaDetalle() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/news/${id}`);
        setNoticia(res.data);
      } catch (error) {
        console.error("Error al obtener la noticia:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [id]);

  if (loading) return <p>Cargando noticia...</p>;
  if (!noticia) return <p>Noticia no encontrada.</p>;

  return (
    <div className="detalle-container">
{noticia.imagen && (
  <img
    className="detalle-img"
    src={`http://localhost:3000/uploads/news/${noticia.imagen}`}
    alt={noticia.titulo}
  />
)}

      <h1>{noticia.titulo}</h1>
      <p className="fecha">
        {new Date(noticia.fechaPublicacion).toLocaleDateString("es-CO", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      </p>
      <div
        className="contenido"
        dangerouslySetInnerHTML={{ __html: noticia.contenido || "" }}
      />
      <Link to="/noticias" className="volver-btn">
        ← Volver
      </Link>
    </div>
  );
}
