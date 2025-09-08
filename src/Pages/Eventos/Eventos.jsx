import React, { useEffect, useState } from "react";
import "./Eventos.css";

const STORAGE_KEY = "intranet_eventos";

const loadEventos = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export default function Eventos() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    setEventos(loadEventos());
  }, []);

  return (
    <div className="eventos-publicos">
      <h1>Próximos Eventos</h1>

      {eventos.length === 0 ? (
        <p>No hay eventos programados en este momento.</p>
      ) : (
        <div className="eventos-grid">
          {eventos.map((ev) => (
            <article className="evento-card" key={ev.id}>
              {ev.imagen && (
                <img src={ev.imagen} alt={ev.titulo} className="evento-img" />
              )}
              <div className="evento-body">
                <h2>{ev.titulo}</h2>
                <p className="fecha">
                  📅 {ev.fechaEvento} | 🕒 {ev.horaEvento}
                </p>
                <p className="lugar">📍 {ev.lugar}</p>
                <p className="desc">{ev.descripcion}</p>
                {ev.link && (
                  <a
                    href={ev.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="evento-btn"
                  >
                    Inscribirse
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
