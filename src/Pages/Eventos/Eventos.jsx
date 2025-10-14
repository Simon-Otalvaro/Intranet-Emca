import React, { useEffect, useState } from "react";
import "./Eventos.css";

export default function Eventos() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/eventos")
      .then((res) => res.json())
      .then((data) => setEventos(data))
      .catch((err) => console.error("Error cargando eventos:", err));
  }, []);

  return (
    <div className="eventos-publicos">
      <h1>🎉 Próximos Eventos</h1>

      {eventos.length === 0 ? (
        <p>No hay eventos programados en este momento.</p>
      ) : (
        <div className="eventos-grid">
          {eventos.map((ev) => (
            <article className="evento-card" key={ev.id}>
              {/* 🖼️ Mostrar imagen del evento si existe */}
              {ev.imagen && (
                <img
                  src={`http://localhost:3000/uploads/events/${ev.imagen}`}
                  alt={ev.nombre}
                  className="evento-imagen"
                />
              )}

              <div className="evento-body">
                <h2>{ev.nombre}</h2>

                {/* 📅 Fecha y hora corregidas */}
                <p className="fecha">
                  {ev.fechaHora ? (
                    <>
                      📅{" "}
                      {new Date(ev.fechaHora).toLocaleDateString("es-CO", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      | 🕒{" "}
                      {new Date(ev.fechaHora).toLocaleTimeString("es-CO", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </>
                  ) : (
                    "Sin fecha definida"
                  )}
                </p>

                {/* 📍 Lugar */}
                {ev.lugar && <p className="lugar">📍 {ev.lugar}</p>}

                {/* 📝 Descripción */}
                <p className="desc">{ev.descripcion}</p>

                {/* 🔗 Link */}
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
