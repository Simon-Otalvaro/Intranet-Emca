import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import esES from "date-fns/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarioEventos.css";

const locales = { es: esES };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

export default function CalendarioEventos() {
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/eventos")
      .then((res) => res.json())
      .then((data) => {
        const eventosTransformados = data.map((ev) => ({
          id: ev.id,
          title: ev.nombre,
          start: new Date(ev.fechaHora),
          end: new Date(ev.fechaHora),
          descripcion: ev.descripcion,
          lugar: ev.lugar,
          link: ev.link,
          imagen: ev.imagen
            ? `http://localhost:3000/uploads/events/${ev.imagen}`
            : null,
        }));
        setEventos(eventosTransformados);
      })
      .catch((err) => console.error("Error cargando eventos:", err));
  }, []);

  return (
    <div className="calendario-container">
      <h2 className="titulo-calendario">📅 Calendario de Eventos</h2>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
        }}
        onSelectEvent={(event) => setEventoSeleccionado(event)}
      />

      {eventoSeleccionado && (
        <div
          className="modal-overlay"
          onClick={() => setEventoSeleccionado(null)}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{eventoSeleccionado.title}</h3>

            {eventoSeleccionado.imagen && (
              <img
                src={eventoSeleccionado.imagen}
                alt={eventoSeleccionado.title}
                className="evento-imagen"
              />
            )}

            <p>
              <strong>📍 Lugar:</strong>{" "}
              {eventoSeleccionado.lugar || "Sin definir"}
            </p>
            <p>
              <strong>🕒 Fecha y hora:</strong>{" "}
              {new Date(eventoSeleccionado.start).toLocaleString("es-ES", {
                dateStyle: "full",
                timeStyle: "short",
              })}
            </p>
            <p>{eventoSeleccionado.descripcion}</p>

            {eventoSeleccionado.link && (
              <p>
                🔗{" "}
                <a
                  href={eventoSeleccionado.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ir al evento
                </a>
              </p>
            )}

            <button onClick={() => setEventoSeleccionado(null)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
