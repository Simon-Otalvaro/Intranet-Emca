import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, isSameDay } from "date-fns";
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
  const [eventosDelDia, setEventosDelDia] = useState(null);
  const [fechaActual, setFechaActual] = useState(new Date());

  useEffect(() => {
    fetch("http://localhost:3000/eventos")
      .then((res) => res.json())
      .then((data) => {
        const eventosTransformados = data.map((ev) => ({
          title: ev.nombre,
          start: new Date(ev.fechaHora),
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

  const handleSelectDay = (date) => {
    const eventosDia = eventos.filter((ev) => isSameDay(ev.start, date));
    setEventosDelDia(eventosDia);
  };

  const CustomDateCell = ({ date }) => {
    if (!(date instanceof Date)) return null;

    const tieneEvento = eventos.some((ev) => isSameDay(ev.start, date));

    return (
      <div
        onClick={() => handleSelectDay(date)}
        className={`celda-dia ${tieneEvento ? "con-evento" : ""}`}
        style={{ cursor: tieneEvento ? "pointer" : "default" }}
      >
        <span className="numero-dia">{date.getDate()}</span>
        {tieneEvento && <span className="marcador-evento">📍</span>}
      </div>
    );
  };

  return (
  <div className="calendario-container">
    <h2 className="titulo-mes">
      {format(fechaActual, "MMMM yyyy", { locale: esES }).toUpperCase()}
    </h2>

    <div className="calendario-layout">
      <div className="calendario-main">
        <Calendar
          localizer={localizer}
          events={[]}
          startAccessor="start"
          endAccessor="end"
          date={fechaActual}
          onNavigate={(date) => setFechaActual(date)}
          style={{ height: 450 }}
          toolbar={false}
          views={["month"]}
          components={{
            month: { dateHeader: CustomDateCell },
          }}
        />
      </div>

      <div className="evento-detalle">
        {eventosDelDia === null ? (
          <div className="sin-eventos">
            <h3>Selecciona una fecha</h3>
            <p>Haz clic en un día del calendario para ver sus eventos.</p>
          </div>
        ) : eventosDelDia.length === 0 ? (
          <div className="sin-eventos">
            <h3>Sin eventos</h3>
            <p>No hay eventos registrados para esta fecha.</p>
          </div>
        ) : (
          <>
            <h3>Eventos del día:</h3>
            {eventosDelDia.map((ev) => (
              <div key={ev.id} className="evento-card">
                {ev.imagen && (
                  <img src={ev.imagen} alt={ev.title} className="evento-imagen" />
                )}
                <h4>{ev.title}</h4>
                <p>
                  <strong>📍 Lugar:</strong> {ev.lugar || "Sin definir"}
                </p>
                <p>
                  <strong>🕒 Fecha y hora:</strong>{" "}
                  {ev.start.toLocaleString("es-ES", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </p>
                <p>{ev.descripcion}</p>
                {ev.link && (
                  <p>
                    🔗{" "}
                    <a href={ev.link} target="_blank" rel="noreferrer">
                      Registrarme para asistir
                    </a>
                  </p>
                )}
              </div>
            ))}
            <button onClick={() => setEventosDelDia(null)}>Cerrar</button>
          </>
        )}
      </div>
    </div>
  </div>
 );
}