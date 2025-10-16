import "./Home.css";
import CalendarioEventos from "../../components/Calendario/CalendarioEventos";
import { useState, useEffect } from "react";
import Slider from "../../components/Slider/Slider";


export default function Home() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/eventos")
      .then(res => res.json())
      .then(data => setEventos(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="home">
      <section className="hero-compact">
        <div className="hero-content">
          <h1>Bienvenido a Intranet EMCA E.S.P</h1>
          <p>En este portal podrás acceder a información relevante sobre noticias, eventos, herramientas e información corporativa.</p>

          <div className="horizontal-line">
            <span>Calendario EMCA</span>
          </div>

          <div className="calendar-card">
            <CalendarioEventos eventos={eventos} />
          </div>
        </div>
        <Slider />
      </section>
    </div>
  );
}
